import os
import re

# GPT_MODEL = "gpt-3.5-turbo"
GPT_MODEL = "gpt-4"

QUIZ_TYPE = 'Post-Lecture Quiz'


# QUIZ_TYPE = 'Pre-Quiz (Lab)'


def extract_week_number(folder_name):
    # Regular expression to match the week number
    week_pattern = re.compile(r'Week (\d+)')

    match = week_pattern.search(folder_name)
    if match:
        return int(match.group(1))
    else:
        return None


if __name__ == "__main__":

    # Print model name in blue italic
    print(f'\033[94m\033[3mGPT Model: {GPT_MODEL}\033[0m')

    # specify the path to your data folder
    env = '../data_by_week'
    # env = './data'

    all_quiz_report = {}
    num_questions = 0
    num_quizzes = 0

    # Process all the folders in alphabetical order
    for folder in sorted(os.listdir(env)):

        # if the folder name includes "Post-Lecture Quiz" or "Pre-Quiz (Lab)" or not a folder
        if QUIZ_TYPE not in folder or not os.path.isdir(
                os.path.join(env, folder)):
            continue

        # Count the number of questions in the quiz
        print(folder, len(os.listdir(os.path.join(env, folder, 'answers', 'G3-iter10'))))
        num_questions += len(os.listdir(os.path.join(env, folder, 'answers', 'G3-iter10')))
        num_quizzes += 1

        quiz_report = os.path.join(env, folder, f'quiz_report-{"G3" if GPT_MODEL == "gpt-3.5-turbo" else "G4"}.md')

        # if there is a report file in the folder
        if os.path.isfile(quiz_report):
            # read the report file
            with open(quiz_report, 'r') as f:
                report = f.read()

            # extract the SUM score
            score_sum = round(float(report.split('SUM: ')[-1].split(' / ')[0].strip()), 2)
            # extract the full score
            score_full = round(float(report.split('SUM: ')[-1].split(' / ')[-1].strip()), 2)
            # Scale the score to 100
            score_100 = round(float(score_sum) / float(score_full) * 100, 2)

            # store the score in the dictionary
            all_quiz_report[folder] = [score_sum, score_full, score_100]

    # File to store the scores for each week
    p_all_quiz_report = os.path.join(env, f'{QUIZ_TYPE} Report-{"G3" if GPT_MODEL == "gpt-3.5-turbo" else "G4"}.md')

    with open(p_all_quiz_report, 'w') as f_all_quiz_report:
        print(f"# Quiz Report - {QUIZ_TYPE}\n", file=f_all_quiz_report)
        print(f"> GPT Model: {GPT_MODEL}", file=f_all_quiz_report)
        print(f"> \n> Number of questions: {num_questions}", file=f_all_quiz_report)
        print(f"> \n> Number of quizzes: {num_quizzes}", file=f_all_quiz_report)

        # Process all the folders in alphabetical order
        for folder in sorted(all_quiz_report.keys(), key=extract_week_number):
            avg_score, full_score, score_100 = all_quiz_report[folder]
            # Write the sum score to the all quiz report
            print(
                f"\nQuiz: {folder} \t\t Score: {round(avg_score, 2)} / {round(full_score, 2)} \t\t Scale_100: {score_100}",
                file=f_all_quiz_report)

        print(f'\n{"*" * 40}\n', file=f_all_quiz_report)

        # The sum of all the sum_avg_score
        sum_avg_score = round(sum([all_quiz_report[folder][0] for folder in all_quiz_report.keys()]), 2)
        sum_full_score = round(sum([all_quiz_report[folder][1] for folder in all_quiz_report.keys()]), 2)
        print(f"\nTotal Score: {sum_avg_score} / {sum_full_score}", file=f_all_quiz_report)

        # turn the sum of all the sum_avg_score to 100 scale
        print(f"\nTotal Score: {round(sum_avg_score / sum_full_score * 100, 2)} / 100.00", file=f_all_quiz_report)

        # The average sum_score_100 of all the quizzes
        avg_score_100 = round(
            sum([all_quiz_report[folder][2] for folder in all_quiz_report.keys()]) / len(all_quiz_report.keys()), 2)
        print(f"\nAverage Scale_100: {avg_score_100} / 100.00", file=f_all_quiz_report)
