FROM golang:1.19-alpine

WORKDIR /app

COPY go.* ./
RUN go mod download

COPY . .

RUN go build -o main .

EXPOSE 3004

CMD ["./main"] 