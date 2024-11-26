from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import nbformat
from nbconvert.preprocessors import ExecutePreprocessor
import os

app = Flask(__name__)
CORS(app)

# Route to run an individual notebook cell
@app.route('/run-cell', methods=['POST'])
def run_cell():
    data = request.get_json()

    # Get notebook name, cell content, and index from the request
    notebook_name = data.get('notebook_name')
    cell_content = data.get('cell')
    cell_index = data.get('cell_index')

    # Ensure notebook name, cell content, and cell index are provided
    if not notebook_name or not isinstance(cell_content, list) or cell_index is None:
        return jsonify({'error': 'Notebook name, cell content (as a list), and cell index are required.'}), 400

    # Construct the notebook path
    notebook_path = os.path.join('userData', notebook_name)  # Adjust the path as necessary
    notebook_path = os.path.abspath(notebook_path)

    # Check if the notebook path exists
    if not os.path.exists(notebook_path):
        return jsonify({'error': 'Notebook file not found at the specified path.'}), 404

    try:
        # Load the notebook
        print(f"Loading notebook from: {notebook_path}")  # Debugging info
        with open(notebook_path) as f:
            nb = nbformat.read(f, as_version=4)

        # Check if the cell index is valid
        if cell_index >= len(nb.cells):
            return jsonify({'error': 'Cell index out of range.'}), 400

        # Execute the specified cell
        print(f"Executing cell at index: {cell_index}")  # Debugging info

        # Create a temporary notebook with just the specified cell
        temp_nb = nbformat.v4.new_notebook()
        temp_nb.cells.append(nb.cells[cell_index])

        ep = ExecutePreprocessor(timeout=1200, kernel_name='python3')  # Increased timeout
        ep.preprocess(temp_nb, {'metadata': {'path': os.path.dirname(notebook_path)}})

        # Update the original notebook with the executed output
        nb.cells[cell_index].outputs = temp_nb.cells[0].outputs

        print("Cell executed successfully.")  # Debugging info

        # Return the updated cell content
        return jsonify({'updated_cell': nb.cells[cell_index].outputs}), 200  # Only return outputs

    except Exception as e:
        error_message = f"Error executing cell: {str(e)}"
        print(error_message)  # Debugging info
        return jsonify({'error': error_message}), 500


if __name__ == '__main__':
    # Ensure the app runs on port 5001
    app.run(debug=True, port=5001)
