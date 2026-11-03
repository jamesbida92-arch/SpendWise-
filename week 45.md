# Exercise A: User Manual Procedure

**Title:** How to Create and Activate a Python Virtual Environment and Install a Package on Windows

**Target Audience:** First-semester computing students

**Estimated Time:** 20 minutes

### 1. Introduction

A Python virtual environment is a separate workspace used to install and manage Python packages for a particular project. It prevents packages from different projects from interfering with one another.

This guide explains how to create a Python virtual environment, activate it, and install a package using Windows PowerShell.

### 2. Prerequisites

Before starting, ensure you have:

- A Windows computer.
- Python 3 installed.
- Visual Studio Code (VS Code) installed.
- Basic knowledge of opening applications and typing commands.
- An internet connection for installing Python packages.
- Access to Windows PowerShell.

### 3. Step-by-Step Procedure

**Step 1: Open Windows PowerShell.**

Action: Search for "PowerShell" in the Windows Start menu and open it.

Expected Result: A PowerShell terminal window appears.

**Step 2: Verify the Python installation.**

Action: Enter the following command:

```powershell
python --version
```

Expected Result: The terminal displays the installed Python version, such as `Python 3.14.7`.

**Step 3: Create a project folder.**

Action: Enter:

```powershell
mkdir python_day5
```

Expected Result: A folder named `python_day5` is created.

**Step 4: Navigate to the project folder.**

Action: Enter:

```powershell
cd python_day5
```

Expected Result: The PowerShell prompt shows that you are inside the `python_day5` folder.

**Step 5: Create a virtual environment.**

Action: Enter:

```powershell
python -m venv venv
```

Expected Result: A folder named `venv` is created inside the project folder.

**Step 6: Activate the virtual environment.**

Action: Enter:

```powershell
.\venv\Scripts\Activate.ps1
```

Expected Result: The terminal prompt begins with `(venv)`, indicating that the virtual environment is active.

**Step 7: Install a Python package.**

Action: Enter:

```powershell
python -m pip install requests
```

Expected Result: The package installs successfully, and the terminal displays a message similar to "Successfully installed requests".

**Step 8: Verify the installed package.**

Action: Enter:

```powershell
python -m pip show requests
```

Expected Result: Information about the Requests package appears, including its name, version, and installation location.

**Step 9: Deactivate the virtual environment.**

Action: Enter:

```powershell
deactivate
```

Expected Result: The `(venv)` label disappears from the terminal prompt.

### 4. Screenshot Description

**Screenshot 1: Successful Virtual Environment Activation**

The screenshot should show Windows PowerShell with the command `.\venv\Scripts\Activate.ps1` and the `(venv)` prefix displayed at the beginning of the terminal prompt.

**Screenshot 2: Successful Package Installation**

The screenshot should show the command `python -m pip install requests` and the installation success message.

These screenshots demonstrate that the virtual environment was activated and the Python package was installed.

### 5. Troubleshooting

**Common Error: PowerShell Blocks Script Execution**

A beginner may encounter an error stating:

"Running scripts is disabled on this system."

**Solution:**

Run the following command in PowerShell:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned
```

This changes the execution policy only for the current PowerShell session.

Afterward, retry the activation command:

```powershell
.\venv\Scripts\Activate.ps1
```

Expected Result: The virtual environment activates successfully and `(venv)` appears in the terminal prompt.

### 6. Conclusion

Creating a Python virtual environment is an important skill for software development. It helps developers organize their projects, manage dependencies, and avoid package conflicts.

By following this procedure, beginners can create a virtual environment, activate it, install a Python package, verify the installation, and deactivate the environment.