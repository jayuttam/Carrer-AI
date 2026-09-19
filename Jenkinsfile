pipeline {
    agent any

    environment {
        IMAGE_NAME = "jayuttam/careerai"
        IMAGE_TAG = "1.0"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Backend Validation') {
            steps {
                bat '''
                    python --version
                    python -m compileall backend/app
                '''
            }
        }

        stage('Frontend Build') {
            steps {
                bat '''
                    cd frontend
                    npm ci
                    npm run build
                '''
            }
        }

        stage('Docker Build') {
            steps {
                bat '''
                    docker build -t %IMAGE_NAME%:%IMAGE_TAG% .
                '''
            }
        }

        stage('Docker Test') {
            steps {
                bat '''
                    docker run -d --name careerai-ci -p 8001:8000 %IMAGE_NAME%:%IMAGE_TAG%
                    timeout /t 10
                    curl http://localhost:8001/health
                    docker stop careerai-ci
                    docker rm careerai-ci
                '''
            }
        }

        stage('Security Scan') {
            steps {
                bat '''
                    docker run --rm aquasec/trivy:latest image %IMAGE_NAME%:%IMAGE_TAG%
                '''
            }
        }

        stage('Push Docker Image') {
            when {
                branch 'main'
            }
            steps {
                echo 'Docker Hub push will be enabled after Jenkins credentials are configured.'
            }
        }
    }

    post {
        always {
            echo 'CareerAI CI/CD pipeline completed.'
        }
    }
}