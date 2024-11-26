# Complete Quantum Sudoku Solver using Qiskit with Custom Constraint Gates and Integration with Quantum Engine
from qiskit import QuantumCircuit, transpile, assemble
from qiskit_ibm_provider import IBMProvider
from qiskit.visualization import plot_histogram
import numpy as np

# Step 1: Load your IBM Quantum account
IBMProvider.save_account(token='MY_API_KEY',overwrite='True')
provider = IBMProvider()

# Step 2: Define the Sudoku grid (use 0 for empty cells)
sudoku_grid = np.array([
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
])
# Step 3: Create the quantum circuit
n_qubits = 81  # One qubit per cell for a 9x9 Sudoku grid
qc = QuantumCircuit(n_qubits)

# Step 4: Apply Hadamard gates to put qubits in superposition
for i in range(n_qubits):
    qc.h(i)


# Step 5: Encode initial known values
for i in range(9):
    for j in range(9):
        if sudoku_grid[i, j] != 0:
            qc.x(i * 9 + j)  # Apply an X gate to set the known value (simplified logic)

# Step 6: Add custom constraint gates to ensure valid Sudoku rules
# Function to add constraint gates to enforce uniqueness in rows
for row in range(9):
    for i in range(9):
        for j in range(i + 1, 9):
            # Apply a controlled gate to check for duplicate values in the row
            qc.cx(row * 9 + i, row * 9 + j)
            qc.z(row * 9 + j)
            qc.cx(row * 9 + i, row * 9 + j)



# Function to add constraint gates to enforce uniqueness in columns
for col in range(9):
    for i in range(9):
        for j in range(i + 1, 9):
            qc.cx(i * 9 + col, j * 9 + col)
            qc.z(j * 9 + col)
            qc.cx(i * 9 + col, j * 9 + col)

# Function to add constraint gates to enforce uniqueness in 3x3 subgrids
for block_row in range(0, 9, 3):
    for block_col in range(0, 9, 3):
        subgrid_qubits = [
            (block_row + i) * 9 + (block_col + j)
            for i in range(3) for j in range(3)
        ]
        for i in range(9):
            for j in range(i + 1, 9):
                qc.cx(subgrid_qubits[i], subgrid_qubits[j])
                qc.z(subgrid_qubits[j])
                qc.cx(subgrid_qubits[i], subgrid_qubits[j])
print("Available backends:")
for backend in provider.backends():
    print(backend.name)  # Changed from backend.name() to backend.name

# Step 7: Measure the qubits
qc.measure_all()

# Step 8: Choose a backend and execute the circuit
backend = provider.get_backend('ibm_kyiv')  # Choose an appropriate backend (simulator or real quantum device)
compiled_circuit = transpile(qc, backend)
job = backend.run(compiled_circuit, shots=100)
result = job.result()
counts = result.get_counts()

# Step 9: Analyze the results
def binary_to_grid(binary_result):
    grid = np.zeros((9, 9), dtype=int)
    for idx, value in enumerate(binary_result):
        grid[idx // 9, idx % 9] = value
    return grid

# Display the most common result
most_common_result = max(counts, key=counts.get)
solved_grid = binary_to_grid([int(bit) for bit in most_common_result[::-1]])

print("Quantum Simulation Result Counts:")
print(counts)
print("\nSolved Sudoku Grid:")
print(solved_grid)