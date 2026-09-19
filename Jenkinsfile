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
                sh '''
                    python3 --version
                    python3 -m compileall backend/app
                '''
            }
        }

        stage('Frontend Build') {
            steps {
                sh '''
                    cd frontend
                    npm ci
                    npm run build
                '''
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                    docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
                '''
            }
        }

        stage('Docker Test') {
            steps {
                sh '''
                    docker run -d --name careerai-ci -p 8001:8000 ${IMAGE_NAME}:${IMAGE_TAG}
                    sleep 10
                    curl --fail http://localhost:8001/health
                    docker stop careerai-ci
                    docker rm careerai-ci
                '''
            }
        }

        stage('Security Scan') {
            steps {
                sh '''
                    echo "Trivy security scan will be enabled after Jenkins Docker access is configured."
                '''
            }
        }

        stage('Docker Hub') {
            when {
                branch 'main'
            }
            steps {
                echo 'Docker Hub push will be configured after Jenkins credentials are added.'
            }
        }
    }

    post {
        always {
            echo 'CareerAI CI/CD pipeline completed.'
        }
    }
}