import os
import xml.etree.ElementTree as ET
from io import StringIO


def process_question(file_name):
    tree = ET.parse(file_name)
    root = tree.getroot()

    question_type = root.find(".//fieldlabel[.='question_type']/../fieldentry").text
    # print(f"Question type: {question_type}\n")
    #
    # question_text = root.find(".//material/mattext").text
    # print("Question:")
    # print(question_text)

    if question_type == "matching_question":
        process_matching_question(root)
    elif question_type == "multiple_choice_question":
        process_multiple_choice_question(root)
    elif question_type == "fill_in_multiple_blanks_question":
        process_fill_in_multiple_blanks_question(root)
    elif question_type == "multiple_answers_question":
        process_multiple_answers_question(root)
    elif question_type == "short_answer_question":
        process_short_answer_question(root)
    elif question_type == "true_false_question":
        process_true_false_question(root)
    elif question_type == "essay_question":
        process_essay_question(root)
    else:
        # Print a red error message
        print(f'\033[91mUnknown question type: {question_type}\033[0m')


def process_matching_question(root, show_correct_answers=True, out_file=None):
    output = StringIO()

    # Get the question type
    question_type = root.find(".//fieldlabel[.='question_type']/../fieldentry").text
    print(f"Question type: {question_type}\n", file=output)

    # Get the question text
    question_text = root.find(".//material/mattext").text
    print("Question:", file=output)
    print(question_text, file=output)

    response_lids = root.findall(".//response_lid")
    choices = {}
    correct_answers = {}

    for lid in response_lids:
        principle = lid.find(".//mattext").text
        principle_ident = lid.get("ident")
        prefixed_principle = f"[[{principle_ident}]] - {principle}"
        choices[prefixed_principle] = []

        label_idents = {}

        for choice in lid.findall(".//response_label"):
            mattext = choice.find(".//mattext").text
            choice_ident = choice.get("ident")
            prefixed_choice = f"[[{choice_ident}]] - {mattext}"
            choices[prefixed_principle].append(prefixed_choice)
            label_idents[choice.get("ident")] = prefixed_choice

        respident = lid.get("ident")
        varequal = root.find(f".//varequal[@respident='{respident}']")
        if varequal is not None:
            correct_answers[prefixed_principle] = label_idents[varequal.text]

    print("\nChoices:", file=output)
    for principle, options in choices.items():
        print(f"{principle}: {', '.join(options)}", file=output)

    if show_correct_answers:
        print("\nCorrect Answers:", file=output)
        for principle, correct_answer in correct_answers.items():
            print(f"{principle}: {correct_answer}", file=output)
    else:
        print("\nChoices:", file=out_file)
        for principle, options in choices.items():
            print(f"{principle}: {', '.join(options)}", file=out_file)

        print("\nCorrect Answers:", file=out_file)
        for principle, correct_answer in correct_answers.items():
            print(f"{principle}: {correct_answer}", file=out_file)

    return output.getvalue()


def process_multiple_choice_question(root, show_correct_answers=True, out_file=None):
    output = StringIO()

    # Get the question type
    question_type = root.find(".//fieldlabel[.='question_type']/../fieldentry").text
    print(f"Question type: {question_type}\n", file=output)

    # Get the question text
    question_text = root.find(".//material/mattext").text
    print("Question:", file=output)
    print(question_text, file=output)

    choices = []
    response_lid = root.find(".//response_lid")
    response_labels = response_lid.findall(".//response_label")

    for label in response_labels:
        ident = label.get("ident")
        choice = label.find(".//mattext").text
        choices.append(f"[[{ident}]] - ({chr(ord('a') + len(choices))}) {choice}")

    print("\nChoices:", file=output)
    for choice in choices:
        print(choice, file=output)

    respident = response_lid.get("ident")
    correct_answer_label = root.find(f".//varequal[@respident='{respident}']")
    correct_answer_ident = correct_answer_label.text
    correct_answer_choice = next(
        (choice for choice in choices if choice.startswith(f"[[{correct_answer_ident}]]")),
        None,
    )

    if show_correct_answers:
        print("\nCorrect Answer:", file=output)
        if correct_answer_choice:
            print(correct_answer_choice, file=output)
        else:
            print("None", file=output)
    else:
        print("\nChoices:", file=out_file)
        for choice in choices:
            print(choice, file=out_file)

        print("\nCorrect Answer:", file=out_file)
        if correct_answer_choice:
            print(correct_answer_choice, file=out_file)
        else:
            print("None", file=out_file)

    return output.getvalue()


def process_fill_in_multiple_blanks_question(root, show_correct_answers=True, out_file=None):
    output = StringIO()

    # Get the question type
    question_type = root.find(".//fieldlabel[.='question_type']/../fieldentry").text
    print(f"Question type: {question_type}\n", file=output)

    # Get the question text
    question_text = root.find(".//material/mattext").text
    print("Question:", file=output)
    print(question_text, file=output)

    response_lids = root.findall(".//response_lid")
    blanks = {}
    correct_answers = {}

    for lid in response_lids:
        blank_name = lid.find(".//mattext").text
        blank_ident = lid.get("ident")
        blanks[f"[[{blank_ident}]] - {blank_name}"] = []
        choices_dict = {}

        for choice in lid.findall(".//response_label"):
            ident = choice.get("ident")
            text = choice.find(".//mattext").text
            choices_dict[ident] = text
            blanks[f"[[{blank_ident}]] - {blank_name}"].append(
                f"[[{ident}]] - ({chr(ord('a') + len(choices_dict) - 1)}) {text}")

        respident = lid.get("ident")
        varequal = root.find(f".//varequal[@respident='{respident}']")
        if varequal is not None:
            correct_answers[
                f"[[{blank_ident}]] - {blank_name}"] = f"[[{varequal.text}]] - {choices_dict[varequal.text]}"

    print("\nBlanks:", file=output)
    for blank_name, options in blanks.items():
        print(f"{blank_name}: {', '.join(options)}", file=output)

    if show_correct_answers:
        print("\nCorrect Answers:", file=output)
        for blank_name, correct_answer in correct_answers.items():
            print(f"{blank_name}: {correct_answer}", file=output)
    else:
        print("\nBlanks:", file=out_file)
        for blank_name, options in blanks.items():
            print(f"{blank_name}: {', '.join(options)}", file=out_file)

        print("\nCorrect Answers:", file=out_file)
        for blank_name, correct_answer in correct_answers.items():
            print(f"{blank_name}: {correct_answer}", file=out_file)

    return output.getvalue()


def process_multiple_answers_question(root, show_correct_answers=True, out_file=None):
    output = StringIO()

    question_type = root.find(".//fieldlabel[.='question_type']/../fieldentry").text
    print(f"Question type: {question_type}\n", file=output)

    question_text = root.find(".//material/mattext").text
    print("Question:", file=output)
    print(question_text, file=output)

    choices = []
    response_lid = root.find(".//response_lid")
    response_labels = response_lid.findall(".//response_label")

    for label in response_labels:
        choice_ident = label.get("ident")
        choice_text = label.find(".//mattext").text
        choices.append(f"[[{choice_ident}]] - {choice_text}")

    print("\nChoices:", file=output)
    for idx, choice in enumerate(choices, 1):
        print(f"{idx}. {choice}", file=output)

    correct_answers = []
    for varequal in root.findall(".//conditionvar/and/varequal"):
        respident = varequal.get("respident")
        if respident == response_lid.get("ident"):
            correct_answers.append(varequal.text)

    if show_correct_answers:
        print("\nCorrect Answers:", file=output)
        for ans in correct_answers:
            for idx, label in enumerate(response_labels, 1):
                if label.get("ident") == ans:
                    print(f"{idx}. {choices[idx - 1]}", file=output)
                    break
    else:
        print("\nChoices:", file=out_file)
        for idx, choice in enumerate(choices, 1):
            print(f"{idx}. {choice}", file=out_file)

        print("\nCorrect Answers:", file=out_file)
        for ans in correct_answers:
            for idx, label in enumerate(response_labels, 1):
                if label.get("ident") == ans:
                    print(f"{idx}. {choices[idx - 1]}", file=out_file)
                    break

    return output.getvalue()


def process_short_answer_question(root, show_correct_answers=True, out_file=None):
    output = StringIO()

    # Get the question type
    question_type = root.find(".//fieldlabel[.='question_type']/../fieldentry").text
    print(f"Question type: {question_type}\n", file=output)

    # Get the question text
    question_text = root.find(".//material/mattext").text
    print("Question:", file=output)
    print(question_text, file=output)

    if show_correct_answers:
        print("\nCorrect Answer:", file=output)
        correct_answer = root.find(".//conditionvar/varequal")
        if correct_answer is not None:
            print(f'[[]] - {correct_answer.text}', file=output)
        else:
            print("No correct answer provided.", file=output)
    else:
        print("\nCorrect Answer:", file=out_file)
        correct_answer = root.find(".//conditionvar/varequal")
        if correct_answer is not None:
            print(f'[[]] - {correct_answer.text}', file=out_file)
        else:
            print("No correct answer provided.", file=out_file)

    return output.getvalue()


def process_true_false_question(root, show_correct_answers=True, out_file=None):
    output = StringIO()

    # Get the question type
    question_type = root.find(".//fieldlabel[.='question_type']/../fieldentry").text
    print(f"Question type: {question_type}\n", file=output)

    # Get the question text
    question_text = root.find(".//material/mattext").text
    print("Question:", file=output)
    print(question_text, file=output)

    print("\nChoices:", file=output)
    response_labels = root.findall(".//response_label")
    for label in response_labels:
        ident = label.get("ident")
        text = label.find(".//mattext").text
        print(f"[[{ident}]] - {text}", file=output)

    if show_correct_answers:
        print("\nCorrect Answer:", file=output)
        correct_answer_ident = root.find(".//conditionvar/varequal")
        if correct_answer_ident is not None:
            correct_answer_text = root.find(f".//response_label[@ident='{correct_answer_ident.text}']/material/mattext")
            if correct_answer_text is not None:
                ident = correct_answer_ident.text
                text = correct_answer_text.text
                print(f"[[{ident}]] - {text}", file=output)
            else:
                print("No correct answer text provided.", file=output)
        else:
            print("No correct answer provided.", file=output)
    else:
        print("\nChoices:", file=out_file)
        response_labels = root.findall(".//response_label")
        for label in response_labels:
            ident = label.get("ident")
            text = label.find(".//mattext").text
            print(f"[[{ident}]] - {text}", file=out_file)

        print("\nCorrect Answer:", file=out_file)
        correct_answer_ident = root.find(".//conditionvar/varequal")
        if correct_answer_ident is not None:
            correct_answer_text = root.find(f".//response_label[@ident='{correct_answer_ident.text}']/material/mattext")
            if correct_answer_text is not None:
                ident = correct_answer_ident.text
                text = correct_answer_text.text
                print(f"[[{ident}]] - {text}", file=out_file)
            else:
                print("No correct answer text provided.", file=out_file)
        else:
            print("No correct answer provided.", file=out_file)

    return output.getvalue()


def process_essay_question(root, show_correct_answers=True, out_file=None):
    output = StringIO()

    # Get the question type
    question_type = root.find(".//fieldlabel[.='question_type']/../fieldentry").text
    print(f"Question type: {question_type}\n", file=output)

    # Get the question text
    question_text = root.find(".//material/mattext").text
    print("Question:", file=output)
    print(question_text, file=output)

    question_text = root.find(".//mattext")
    if question_text is not None:
        print("\nQuestion Type Is Open Question.", file=output)
    else:
        print("No question text provided.", file=output)

    return output.getvalue()


if __name__ == "__main__":
    # specify the path to your data folder
    env = '../data_cleaned'
    # env = './data'

    # Process all the folders in alphabetical order
    for folder in sorted(os.listdir(env)):
        # if there is a subfolder in the folder called items
        if os.path.isdir(os.path.join(env, folder, 'items')):
            # Print a green bold message
            print(f"\n\033[1;32m# Quiz: {folder}\033[0m")
            # Process all the files in the items folder in alphabetical order
            for i, file in enumerate(sorted(os.listdir(os.path.join(env, folder, 'items')))):
                # if the file is a xml file
                if file.endswith('.xml'):
                    # process the question
                    # Print the question number in bold
                    print(f"\n\033[1m## Question {i + 1}: \n\033[0m")
                    process_question(os.path.join(env, folder, 'items', file))
                    print()
