Kubernetes Deployment of Node.js Application
Overview
This guide explains how to deploy a containerized Node.js application on Kubernetes using Minikube. The application is containerized with Docker and exposed via a Kubernetes service.

Prerequisites
Minikube (for local Kubernetes cluster)

Docker (for containerization)

Kubectl (Kubernetes CLI)

Node.js (application runtime)

Steps
1. Create and Push Docker Image
Build the Docker Image:

bash
Copy
Edit
docker build -t aerored/calculator .
Tag and Push the Image to Docker Hub:

bash
Copy
Edit
docker tag aerored/calculator aerored/calculator:latest
docker push aerored/calculator:latest
2. Set Up Minikube Cluster
Start Minikube:

bash
Copy
Edit
minikube start
Verify Cluster:

bash
Copy
Edit
kubectl cluster-info
3. Create Kubernetes Deployment and Service
Deployment Configuration (deployment.yaml):

yaml
Copy
Edit
apiVersion: apps/v1
kind: Deployment
metadata:
  name: calculator-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: calculator
  template:
    metadata:
      labels:
        app: calculator
    spec:
      containers:
      - name: calculator-container
        image: aerored/calculator:latest
        ports:
        - containerPort: 3000
Apply the deployment:

bash
Copy
Edit
kubectl apply -f deployment.yaml
Service Configuration (service.yaml):

yaml
Copy
Edit
apiVersion: v1
kind: Service
metadata:
  name: calculator-service
spec:
  type: NodePort
  selector:
    app: calculator
  ports:
    - port: 3000
      targetPort: 3000
      nodePort: 30080
Apply the service:

bash
Copy
Edit
kubectl apply -f service.yaml
4. Access the Application
Get Minikube IP:

bash
Copy
Edit
minikube ip
Access via Browser: Go to http://<minikube-ip>:30080 to view the application.

