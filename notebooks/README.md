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
1. Run `docker-compose -f notebooks/docker-compose.yml up`. This should print out a URL like `http://127.0.0.1:8888/?token=<...>`.
2. Run `docker ps` to find the port that it bound to on the host, call it PORT
3. `ssh` to the host to forward that port to port 8888 on your local machine: `ssh -L 8888:localhost:PORT`.
4. Navigate to that URL output at step 1 on your local computer.
