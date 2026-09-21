"""Ejecuta este archivo y abre http://localhost:8000."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from functools import partial
import argparse

def main():
    parser = argparse.ArgumentParser(description="Un ramo para ti")
    parser.add_argument("--port", type=int, default=8000)
    args = parser.parse_args()
    handler = partial(SimpleHTTPRequestHandler, directory=str(Path(__file__).parent / "dist"))
    server = ThreadingHTTPServer(("127.0.0.1", args.port), handler)
    print(f"Tu ramo está listo: http://localhost:{args.port}", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()

if __name__ == "__main__":
    main()
