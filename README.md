Here’s a more concise version of the README with fewer steps while maintaining the essential details for deploying the Node.js app on Kubernetes.

---

# Kubernetes Deployment of Node.js Application

## Overview

This guide explains how to deploy a containerized Node.js application on Kubernetes using **Minikube**. The application is containerized with **Docker** and exposed via a **Kubernetes service**.

---

## Prerequisites

- **Minikube** (for local Kubernetes cluster)
- **Docker** (for containerization)
- **Kubectl** (Kubernetes CLI)
- **Node.js** (application runtime)

---

## Steps

### 1. **Create and Push Docker Image**

1. **Build the Docker Image**:
   ```bash
   docker build -t aerored/calculator .
   ```

2. **Tag and Push the Image to Docker Hub**:
   ```bash
   docker tag aerored/calculator aerored/calculator:latest
   docker push aerored/calculator:latest
   ```

### 2. **Set Up Minikube Cluster**

1. **Start Minikube**:
   ```bash
   minikube start
   ```

2. **Verify Cluster**:
   ```bash
   kubectl cluster-info
   ```

### 3. **Create Kubernetes Deployment and Service**

1. **Deployment Configuration (`deployment.yaml`)**:
   ```yaml
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
   ```

   Apply the deployment:
   ```bash
   kubectl apply -f deployment.yaml
   ```

2. **Service Configuration (`service.yaml`)**:
   ```yaml
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
   ```

   Apply the service:
   ```bash
   kubectl apply -f service.yaml
   ```

### 4. **Access the Application**

1. **Get Minikube IP**:
   ```bash
   minikube ip
   ```

2. **Access via Browser**:
   Go to `http://<minikube-ip>:30080` to view the application.

3. **minikube service calculator-service --url**

---


