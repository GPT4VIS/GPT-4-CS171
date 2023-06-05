import re
import xml.etree.ElementTree as ET


def grade_matching_question(student_answer, root):
    # Extract metadata
    points_possible = float(root.find(".//qtimetadatafield[fieldlabel='points_possible']/fieldentry").text)

    # Parse XML and find resprocessing
    resprocessing = root.find('resprocessing')

    # Get maxvalue
    maxvalue = float(resprocessing.find(".//decvar").get("maxvalue"))

    # Extract student answers
    # answer_pattern = r'\[\[(.*?)\]\] - .*?: (\[\[(?:\d+)\]\](?: - .*?,? ?)*)'
    answer_pattern = r'\[\[(.*?)\]\] - .*?: (\[\[(?:\d+)\]\].*)'
    matches = re.findall(answer_pattern, student_answer)

    # Build student_answers dictionary
    student_answers = {}
    for match in matches:
        response_id, answer_ids = match
        answer_id_list = re.findall(r'\[\[(\d+)\]\]', answer_ids)
        student_answers[response_id] = set(answer_id_list)

    # Initialize score
    score = 0

    # Evaluate conditions in resprocessing
    for condition in resprocessing.findall('respcondition'):
        conditionvar = condition.find('conditionvar')
        setvar = condition.find('setvar')

        if conditionvar is not None and setvar is not None:
            action = setvar.get('action')
            value = float(setvar.text)

            response_id = conditionvar.find('varequal').get('respident')
            answer_id = conditionvar.find('varequal').text

            if action == 'Add':
                if response_id in student_answers and answer_id in student_answers[response_id]:
                    # If student_answers[response_id] contains element that is not equal to answer_id, then the student's answer is incorrect
                    if len(student_answers[response_id]) > 1:
                        pass
                    else:
                        score += value

    return score / maxvalue * points_possible


def grade_multiple_choice_question(student_answer, root):
    # Extract metadata
    points_possible = float(root.find(".//qtimetadatafield[fieldlabel='points_possible']/fieldentry").text)
    correct_answer_id = root.find(".//respcondition/conditionvar/varequal").text

    # Extract student answer
    student_answer_pattern = r'\[\[(\d+)\]\]'
    student_answer_id = re.search(student_answer_pattern, student_answer)

    # Initialize score
    score = 0

    if student_answer_id:
        student_answer_id = student_answer_id.group(1)

        # Check if student's answer is correct
        if student_answer_id == correct_answer_id:
            score = points_possible

    return score


def grade_fill_in_multiple_blanks_question(student_answer, root):
    # Extract metadata
    points_possible = float(root.find(".//qtimetadatafield[fieldlabel='points_possible']/fieldentry").text)

    # Extract student answers
    answer_pattern = r'\[\[(.*?)\]\] - .*?: \[\[(\d+)\]\] - .*'
    matches = re.findall(answer_pattern, student_answer)

    # Build student_answers dictionary
    student_answers = {}
    for match in matches:
        response_id, answer_id = match
        student_answers[response_id] = answer_id

    # Initialize score
    score = 0

    # Evaluate conditions in resprocessing
    resprocessing = root.find('resprocessing')
    maxvalue = float(resprocessing.find(".//decvar").get("maxvalue"))
    for condition in resprocessing.findall('respcondition'):
        conditionvar = condition.find('conditionvar')
        setvar = condition.find('setvar')

        if conditionvar is not None and setvar is not None:
            action = setvar.get('action')
            value = float(setvar.text)

            response_id = conditionvar.find('varequal').get('respident')
            answer_id = conditionvar.find('varequal').text

            if action == 'Add':
                if response_id in student_answers and answer_id == student_answers[response_id]:
                    score += value

    return score / maxvalue * points_possible


def grade_multiple_answers_question(student_answer, root):
    # Extract metadata
    points_possible = float(root.find(".//qtimetadatafield[fieldlabel='points_possible']/fieldentry").text)
    original_answer_ids = set(
        root.find(".//qtimetadatafield[fieldlabel='original_answer_ids']/fieldentry").text.split(','))

    # Extract student answers
    answer_pattern = r'\[\[(\d+)\]\] - .*?'
    student_answer_ids = set(re.findall(answer_pattern, student_answer))

    # Parse XML and find resprocessing
    resprocessing = root.find('resprocessing')

    # Get maxvalue
    maxvalue = float(resprocessing.find(".//decvar").get("maxvalue"))

    correct_answers = set()
    incorrect_answers = original_answer_ids.copy()

    # Find correct answers and remove them from incorrect_answers
    for condition in resprocessing.findall('respcondition'):
        conditionvar = condition.find('conditionvar')
        setvar = condition.find('setvar')

        if conditionvar is not None and setvar is not None:
            and_condition = conditionvar.find('and')
            if and_condition is not None:
                varequals = and_condition.findall('varequal')
                correct_condition_answers = set([str(e.text) for e in varequals])
                correct_answers.update(correct_condition_answers)
                incorrect_answers -= correct_condition_answers

    # Count correct and incorrect answers selected by the student
    correct_selected = student_answer_ids.intersection(correct_answers)
    incorrect_selected = student_answer_ids.intersection(incorrect_answers)

    # Calculate the final score
    score = len(correct_selected) - len(incorrect_selected)
    if score < 0:
        score = 0

    return score / len(correct_answers) * points_possible


def grade_short_answer_question(student_answer, root):
    # Extract metadata
    points_possible = float(root.find(".//qtimetadatafield[fieldlabel='points_possible']/fieldentry").text)

    # Parse student answer
    answer_pattern = r'\[\[\w*\]\] - (.*?)$'
    match = re.search(answer_pattern, student_answer)

    if match:
        student_answer_text = match.group(1)
    else:
        return 0  # No answer provided

    # Find resprocessing element
    resprocessing = root.find('resprocessing')

    # Get maxvalue
    maxvalue = float(resprocessing.find(".//decvar").get("maxvalue"))

    # Initialize score
    score = 0

    # Evaluate conditions in resprocessing
    for condition in resprocessing.findall('respcondition'):
        conditionvar = condition.find('conditionvar')
        setvar = condition.find('setvar')

        if conditionvar is not None and setvar is not None:
            response_id = conditionvar.find('varequal').get('respident')
            answer_id = conditionvar.find('varequal').text
            action = setvar.get('action')
            value = float(setvar.text)

            if action == 'Set' and student_answer_text == answer_id:
                score = value

    return score / maxvalue * points_possible


def grade_true_false_question(student_answer, root):
    # Extract metadata
    points_possible = float(root.find(".//qtimetadatafield[fieldlabel='points_possible']/fieldentry").text)

    # Parse XML and find resprocessing
    resprocessing = root.find('resprocessing')

    # Get maxvalue
    maxvalue = float(resprocessing.find(".//decvar").get("maxvalue"))

    # Extract student answer
    answer_pattern = r'\[\[(\d+)\]\] - .*?'
    answer_id = re.search(answer_pattern, student_answer).group(1)

    # Initialize score
    score = 0

    # Evaluate conditions in resprocessing
    for condition in resprocessing.findall('respcondition'):
        conditionvar = condition.find('conditionvar')
        setvar = condition.find('setvar')

        if conditionvar is not None and setvar is not None:
            action = setvar.get('action')
            value = float(setvar.text)

            response_id = conditionvar.find('varequal').get('respident')
            correct_answer_id = conditionvar.find('varequal').text

            if action == 'Set' and answer_id == correct_answer_id:
                score = value
                break

    return score / maxvalue * points_possible


def grade_essay_question(student_answer, root):
    # Extract metadata
    points_possible = float(root.find(".//qtimetadatafield[fieldlabel='points_possible']/fieldentry").text)

    # Give full credit if student provided an answer
    if student_answer:
        return points_possible
    else:
        return 0


if __name__ == '__main__':
    # parse the XML file
    tree = ET.parse('./data/assignment_Week 4 | Pre-Quiz (Lab)/items/item_10.xml')
    root = tree.getroot()

    # grade the student's answer
    student_answer = """Answer: 
[[response_channels]] - channels: [[2532]] - (b) channel
[[response_marks]] - marks: [[5705]] - marks
"""
    # student_answer = """
    # Answer:
    # [[54801]] - True
    # """

    # score = grade_matching_question(student_answer, root)
    score = grade_fill_in_multiple_blanks_question(student_answer, root)
    # score = grade_multiple_choice_question(student_answer, root)
    # score = grade_multiple_answers_question(student_answer, root)
    # score = grade_short_answer_question(student_answer, root)
    # score = grade_true_false_question(student_answer, root)
    # score = grade_essay_question(student_answer, root)

    print(f"Score: {score}")
