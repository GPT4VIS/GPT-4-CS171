import os
import re
import xml.etree.ElementTree as ET


def split_xml_to_questions(folder_path, file_name):
    # Read XML file
    xml_file = os.path.join(folder_path, file_name)
    with open(xml_file, 'r') as f:
        xml_str = f.read()

    # Define pattern (regular expression)
    pattern = r'<item\sident="(\w+)"\stitle="([\w\s]+?)">(.*?)</item>'
    pattern = r'<item\sident="(\w+)"\stitle="(.+?)">(.*?)</item>'

    # search for all matches
    matches = re.findall(pattern, xml_str, re.DOTALL)

    # Create a folder to store the matches
    if not os.path.exists(os.path.join(folder_path, 'items')):
        os.mkdir(os.path.join(folder_path, 'items'))

    # save each match to a file
    for i, match in enumerate(matches):
        ident, title, content = match
        with open(os.path.join(folder_path, 'items', f'item_{i}.xml'), 'w') as f:
            f.write(f'<item ident="{ident}" title="{title}">\n')
            f.write(content.strip())
            f.write('\n</item>\n')


def rename(env, folder_name):
    # specify the path to your XML file
    folder_path = os.path.join(env, folder_name)
    xml_file_path = os.path.join(folder_path, 'assessment_meta.xml')

    # rename the xml file starting with "g" to "data_meta.xml"
    for file in os.listdir(folder_path):
        if file.startswith('g') and len(file) > 30:
            os.rename(os.path.join(folder_path, file), os.path.join(folder_path, 'data_meta.xml'))

    # parse the XML file
    tree = ET.parse(xml_file_path)
    root = tree.getroot()

    # extract the quiz_type and title elements
    quiz_type = root.find("{http://canvas.instructure.com/xsd/cccv1p0}quiz_type").text
    title = root.find("{http://canvas.instructure.com/xsd/cccv1p0}title").text

    # construct the new folder name
    new_folder_name = f"{quiz_type}_{title}"
    print(f'New folder name: {new_folder_name}')

    # rename the folder
    new_folder_path = os.path.join(env, new_folder_name)
    # if the new folder name does not exist
    if not os.path.exists(new_folder_path):
        # rename the folder
        os.rename(folder_path, new_folder_path)
    else:
        # if the new folder name exists, add a number to the end of the folder name
        i = 1
        while os.path.exists(new_folder_path):
            new_folder_path = os.path.join(env, f'{new_folder_name}_({i})')
            i += 1
        os.rename(folder_path, new_folder_path)


if __name__ == '__main__':

    # specify the path to your data folder
    # env = '../data_cleaned'
    env = '../data_by_week'
    # for all the folders in the env directory
    for folder in os.listdir(env):

        # if the folder name starts with "g" and length is longer than 30
        if folder.startswith('g') and len(folder) > 30:
            # rename the folder
            rename(env, folder)

        # if the folder name includes "Pre-Quiz"
        # if 'Pre-Quiz' in folder:
        if 'Post-Lecture Quiz' in folder or 'Pre-Quiz (Lab)' in folder:
            # if there exists a file named "data_meta.xml" in the folder
            if os.path.exists(os.path.join(env, folder, 'data_meta.xml')):
                # split the XML file
                split_xml_to_questions(os.path.join(env, folder), 'data_meta.xml')
