# Get started

## Using Visual Studio Code

The recommended mode of working with the notebooks is to use the [VS Code Dev Containers](https://code.visualstudio.com/docs/remote/containers) extension with the [Remote - SSH](https://code.visualstudio.com/docs/remote/ssh) extension to connect to a container running on a CHAI server with access to `/nas`.

1. Click on the >< button in the bottom left of the screen.
2. Choose `Connect to Host...`
3. Connect to `vae.ist.berkeley.edu` or another host.
4. When the new window opens click `><` again and choose `Open Folder in Container...`
5. Open `./KataGoVisualizer/notebooks`
6. Make sure the recommended extensions are installed in the container (Python, Jupyter)
7. Change the kernel to `venv` (`/opt/venv/bin/python`)

## Without Visual Studio Code

To work with the notebooks without VS Code:
1. Choose an unused port on the host, say, 7139.
2. `ssh` to the host with the port exposed: `ssh -L 7139:7139 <username>@vae.ist.berkeley.edu`
3. Go to `KataGoVisualizer` and build the notebook Docker image: `docker build .
   -f notebooks/Dockerfile -t humancompatibleai/katagovisualizer:notebook`
4. Assuming `KataGoVisualizer` is located at `~/KataGoVisualizer`, run the
   notebook inside the container: `docker run -v ~/KataGoVisualizer:/viz -v
   /nas/ucb:/nas/ucb -p 7139:7139 -it
   humancompatibleai/katagovisualizer:notebook sh -c "jupyter notebook --port
   7139 --ip 0.0.0.0 --allow-root --notebook-dir /viz/notebooks/notebooks"`
5. This should print out a URL like `http://127.0.0.1:7139/?token=<...>`.
   Navigate to that URL on your local computer.
