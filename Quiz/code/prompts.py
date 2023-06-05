import random
import shutil
import time

import openai
from XML_to_QA import *
from grading import *

# MODIFY_TYPE = None
MODIFY_TYPE = "matching_question"

GPT_MODEL = "gpt-3.5-turbo"
# GPT_MODEL = "gpt-4"

if GPT_MODEL == "gpt-4":
    openai.api_key = 'KEY'
elif GPT_MODEL == "gpt-3.5-turbo":
    openai.api_key = "KEY"

prompt_prefix = """
The following is a quiz question, please give your answer in the following format, and you do not need to explain why. Note that there is an [[ident]] in front of each object, which is an id number, so your answer should include the [[ident]] as well. Do not change the [[ident]] value.
The desired format is like this:
```
Answer: """

prompt_suffix = """
```
The quiz question is: \n\n
"""

ANS_EXAMPLE_matching_question = """
[[response_864]] - asd sadas: [[206]] - qwe
[[response_924]] - fgh: [[460]] - rty zxc
[[response_626]] - jkl: [[311]] - uio

Here are some rules you MUST follow:
1. The answer you give should consist of matches that is in the form of "[[identX]] - X: [[identY]] - Y". Note that the match should be one to one correspondence, do not assign multiple Ys to one X. For example, the match "[[response_712]] - abc: [[525]] - def, [[269]] - xyz" is not allowed, because there are more than one Ys ([[525]] - def, [[269]] - xyz) assigned to one X ([[response_712]] - abc).
2. The number of matches you give should be the same as the number of choices required in the question. For example, if there are n choices, your answer should also contain n one-to-one matches.
"""

ANS_EXAMPLE_multiple_choice_question = """
[[1178]] - (b) abc def sss
"""

ANS_EXAMPLE_fill_in_multiple_blanks_question = """
[[response_abc]] - abc: [[7525]] - def
[[response_xyz]] - xyz: [[5745]] - opq
"""

ANS_EXAMPLE_multiple_answers_question = """
1. [[5943]] - abc
"""

ANS_EXAMPLE_short_answer_question = """
[[]] - abc
"""

ANS_EXAMPLE_true_false_question = """
[[2726]] - True
"""

ANS_EXAMPLE_essay_question = """
Your essay here.
"""


def question_iteration(env, folder, q_idx, file_name, iter_num=10):
    # save the answer to this path
    if GPT_MODEL == "gpt-4":
        save_path = os.path.join(env, folder, 'answers', f'G4-iter{iter_num}')
    elif GPT_MODEL == "gpt-3.5-turbo":
        save_path = os.path.join(env, folder, 'answers', f'G3-iter{iter_num}')

    # create a file to save the answer
    if not os.path.exists(save_path):
        os.makedirs(save_path)
    output_file = os.path.join(save_path, f'Question_{q_idx}.md')

    tree = ET.parse(file_name)
    root = tree.getroot()
    points_possible = float(root.find(".//qtimetadatafield[fieldlabel='points_possible']/fieldentry").text)

    # Redirect print statements to the output file
    with open(output_file, 'w') as f:
        print(f"# {folder} | Question {q_idx}\n", file=f)

        print(f'GPT Model: {GPT_MODEL}\n', file=f)

        question_type = root.find(".//fieldlabel[.='question_type']/../fieldentry").text
        print(f"Question type: {question_type}\n", file=f)

        question_text = root.find(".//material/mattext").text
        print("Question:", file=f)
        print(question_text, file=f)

        # Process questions here
        if question_type == "matching_question":
            ques = process_matching_question(root, show_correct_answers=False, out_file=f)
        elif question_type == "multiple_choice_question":
            ques = process_multiple_choice_question(root, show_correct_answers=False, out_file=f)
        elif question_type == "fill_in_multiple_blanks_question":
            ques = process_fill_in_multiple_blanks_question(root, show_correct_answers=False, out_file=f)
        elif question_type == "multiple_answers_question":
            ques = process_multiple_answers_question(root, show_correct_answers=False, out_file=f)
        elif question_type == "short_answer_question":
            ques = process_short_answer_question(root, show_correct_answers=False, out_file=f)
        elif question_type == "true_false_question":
            ques = process_true_false_question(root, show_correct_answers=False, out_file=f)
        elif question_type == "essay_question":
            ques = process_essay_question(root, show_correct_answers=False, out_file=f)
        else:
            # Print a red error message
            print(f'\033[91mUnknown question type: {question_type}\033[0m')
            return None

        print(f"\n{'*' * 40}", file=f)

        score_avg = 0

        for i in range(iter_num):
            print(f'\nATTEMPT {i + 1}\n', file=f)
            ans, score = ask_and_grade(file_name, ques)
            score_avg += score
            print(f"{ans}\n", file=f)
            print(f"Score: {score}\n", file=f)
            print("-" * 20, file=f)
            print(f'ATTEMPT {i + 1}\t\t Score: {score}')

        score_avg = round(score_avg / iter_num, 2)
        print(f"\nAverage score: {score_avg} / {points_possible}", file=f)

        return score_avg, points_possible


def ask_and_grade(file_name, ques):
    tree = ET.parse(file_name)
    root = tree.getroot()

    question_type = root.find(".//fieldlabel[.='question_type']/../fieldentry").text

    if question_type == "matching_question":
        ans = chat(prompt_prefix + ANS_EXAMPLE_matching_question + prompt_suffix + ques)
        score = grade_matching_question(ans, root)
    elif question_type == "multiple_choice_question":
        ans = chat(prompt_prefix + ANS_EXAMPLE_multiple_choice_question + prompt_suffix + ques)
        score = grade_multiple_choice_question(ans, root)
    elif question_type == "fill_in_multiple_blanks_question":
        ans = chat(prompt_prefix + ANS_EXAMPLE_fill_in_multiple_blanks_question + prompt_suffix + ques)
        score = grade_fill_in_multiple_blanks_question(ans, root)
    elif question_type == "multiple_answers_question":
        ans = chat(prompt_prefix + ANS_EXAMPLE_multiple_answers_question + prompt_suffix + ques)
        score = grade_multiple_answers_question(ans, root)
    elif question_type == "short_answer_question":
        ans = chat(prompt_prefix + ANS_EXAMPLE_short_answer_question + prompt_suffix + ques)
        score = grade_short_answer_question(ans, root)
    elif question_type == "true_false_question":
        ans = chat(prompt_prefix + ANS_EXAMPLE_true_false_question + prompt_suffix + ques)
        score = grade_true_false_question(ans, root)
    elif question_type == "essay_question":
        ans = chat(prompt_prefix + ANS_EXAMPLE_essay_question + prompt_suffix + ques)
        score = grade_essay_question(ans, root)
    else:
        # Print a red error message
        print(f'\033[91mUnknown question type: {question_type}\033[0m')
        return None

    return ans, round(score, 2)


def modify_question_type(question_type, env, folder, q_idx, file_name, iter_num=10):
    # save the answer to this path
    if GPT_MODEL == "gpt-4":
        save_path = os.path.join(env, folder, 'answers', f'G4-iter{iter_num}')
    elif GPT_MODEL == "gpt-3.5-turbo":
        save_path = os.path.join(env, folder, 'answers', f'G3-iter{iter_num}')

    output_file = os.path.join(save_path, f'Question_{q_idx}.md')

    tree = ET.parse(file_name)
    root = tree.getroot()
    points_possible = float(root.find(".//qtimetadatafield[fieldlabel='points_possible']/fieldentry").text)

    if question_type != root.find(".//fieldlabel[.='question_type']/../fieldentry").text:
        # Read results from previous records
        if os.path.exists(output_file):
            with open(output_file, 'r') as f:
                lines = f.readlines()
                # Find score_avg from the line starting with "Average score" (e.g. "Average score: 0.0 / 1.0")
                for line in lines:
                    if line.startswith("Average score"):
                        score_avg = round(float(line.split(':')[-1].split('/')[0].strip()), 2)
                        break
        else:
            # Bold Red Error: the file does not exist
            print(f'\033[91m\033[1m{output_file} does not exist!\033[0m')
            score_avg = 0

    else:
        print(f"Question {q_idx} is a {question_type} question. Re-chat.")
        score_avg, points_possible = question_iteration(env, folder, i + 1, os.path.join(env, folder, 'items', file))

    return score_avg, points_possible


def chat(prompt):
    messages = [
        {"role": "system", "content": "You are a student who has took CS171 Data Visualization at Harvard."},
        {"role": "user", "content": prompt}
    ]

    chat_completion = openai.ChatCompletion.create(
        model=GPT_MODEL,
        messages=messages
    )
    answer = chat_completion.choices[0].message.content
    # print(f"\n{answer}")

    return answer


if __name__ == "__main__":

    # Print model name in blue italic
    print(f'\033[94m\033[3mGPT Model: {GPT_MODEL}\033[0m')

    # specify the path to your data folder
    # env = '../data_by_week'
    env = './data'

    # Process all the folders in alphabetical order
    for folder in sorted(os.listdir(env)):

        # if the folder name includes "Post-Lecture Quiz" or "Pre-Quiz (Lab)" or not a folder
        if 'Post-Lecture Quiz' not in folder and 'Pre-Quiz (Lab)' not in folder or not os.path.isdir(
                os.path.join(env, folder)):
            # delete the folder or skip the file
            if os.path.isdir(os.path.join(env, folder)):
                shutil.rmtree(os.path.join(env, folder))
            else:
                continue
                # os.remove(os.path.join(env, folder))

        # if there is a subfolder in the folder called items
        if os.path.isdir(os.path.join(env, folder, 'items')):

            sum_avg_score = 0
            sum_full_score = 0

            # File to record the scores for all questions
            quiz_report = os.path.join(env, folder, f'quiz_report-{"G3" if GPT_MODEL == "gpt-3.5-turbo" else "G4"}.md')

            # If quiz_report already exists, skip the quiz
            if os.path.exists(quiz_report):
                print(f"\033\n[1;32m# Quiz: {folder}\n\033[0m")
                print(f"Quiz already taken\n")
                continue

            with open(quiz_report, 'w') as f_quiz_report:
                print(f"# Quiz Report: {folder}\n", file=f_quiz_report)

                # create a folder to store the answers if it does not exist
                if not os.path.exists(os.path.join(env, folder, 'answers')):
                    os.makedirs(os.path.join(env, folder, 'answers'))

                # Print a green bold message
                print(f"\n\033[1;32m# Quiz: {folder}\033[0m")
                # Process all the files in the items folder in alphabetical order
                for i, file in enumerate(sorted(os.listdir(os.path.join(env, folder, 'items')))):
                    # if the file is a xml file
                    if file.endswith('.xml'):
                        # process the question
                        # Print the question number in bold
                        print(f"\n\033[1m## Question {i + 1}: \033[0m")

                        if MODIFY_TYPE:
                            # Modify the question type
                            avg_score, full_score = modify_question_type(MODIFY_TYPE, env, folder, i + 1,
                                                                         os.path.join(env, folder, 'items', file))
                        else:
                            avg_score, full_score = question_iteration(env, folder, i + 1,
                                                                       os.path.join(env, folder, 'items', file))

                        sum_avg_score += avg_score
                        sum_full_score += full_score

                        print(f"Average score: {avg_score} / {full_score}")

                        # Write the score to the quiz report
                        print(f"Question {i + 1}: {avg_score} / {full_score}\n", file=f_quiz_report)

                        # Sleep for 1-3 seconds randomly
                        # time.sleep(random.randint(1, 3))

                # Write the sum score to the quiz report
                sum_avg_score = round(sum_avg_score, 2)
                sum_full_score = round(sum_full_score, 2)
                print(f"SUM: {sum_avg_score} / {sum_full_score}", file=f_quiz_report)
