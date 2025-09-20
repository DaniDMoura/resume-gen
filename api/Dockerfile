FROM ghcr.io/astral-sh/uv:alpine3.21

WORKDIR /app

COPY pyproject.toml uv.lock* ./

RUN uv sync --frozen --no-dev

COPY . .

EXPOSE 8000

CMD ["uv", "run", "fastapi", "run", "core/main.py", "--workers", "4", "--host", "0.0.0.0", "--port", "8000"]