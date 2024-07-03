import os

def combine_files(directory, output_file):
    with open(output_file, 'w', encoding='utf-8') as outfile:
        for filename in os.listdir(directory):
            file_path = os.path.join(directory, filename)
            if os.path.isfile(file_path):
                outfile.write(f"// {filename}\n")
                with open(file_path, 'r', encoding='utf-8') as infile:
                    outfile.write(infile.read())
                outfile.write("\n\n\n")

# Укажите директорию с файлами и имя выходного файла
directory = "src/components"
output_file = "vue_components_context.txt"
combine_files(directory, output_file)
print(f"Все файлы были объединены в {output_file}")

directory = "src/stores"
output_file = "vue_stores_context.txt"
combine_files(directory, output_file)
print(f"Все файлы были объединены в {output_file}")