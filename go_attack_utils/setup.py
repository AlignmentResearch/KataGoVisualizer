from distutils.core import setup

setup(
    name="go_attack_utils",
    version="0.1.0",
    package_dir={"": "src"},
    packages=["sgf_parser"],
    python_requires=">=3.7.0",
)
