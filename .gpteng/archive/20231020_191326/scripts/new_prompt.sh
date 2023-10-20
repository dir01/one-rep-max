#!/bin/bash

# Get current date and time
current_date=$(date +"%Y-%m-%d-%H-%M-%S")

# Define source and destination files
src_file="prompt"
dst_file="old_prompts/prompt-$current_date"

# Create the old_prompts directory if it doesn't exist
mkdir -p old_prompts

# Move source file to the destination
mv $src_file $dst_file

# Create a new 'prompt' file
touch $src_file

echo "File copied successfully to $dst_file and new prompt file created."
