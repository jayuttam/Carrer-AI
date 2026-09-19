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
            docker rm -f careerai-ci 2>/dev/null || true

            docker run -d \
                --name careerai-ci \
                --network jenkins \
                ${IMAGE_NAME}:${IMAGE_TAG}

            sleep 10

            curl --fail http://careerai-ci:8000/health

            docker stop careerai-ci
            docker rm careerai-ci
        '''
    }
}

        stage('Security Scan') {
    steps {
        sh '''
            docker run --rm \
              -v /var/run/docker.sock:/var/run/docker.sock \
              aquasec/trivy:latest \
              image \
              --scanners vuln \
              --severity HIGH,CRITICAL \
              --exit-code 1 \
              ${IMAGE_NAME}:${IMAGE_TAG}
        '''
    }
}

        stage('Docker Hub') {
    when {
        branch 'main'
    }
    steps {
        withCredentials([
            usernamePassword(
                credentialsId: 'dockerhub-creds',
                usernameVariable: 'DOCKER_USERNAME',
                passwordVariable: 'DOCKER_PASSWORD'
            )
        ]) {
            sh '''
                echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

                docker push ${IMAGE_NAME}:${IMAGE_TAG}

                docker logout
            '''
        }
    }
}

    post {
        always {
            echo 'CareerAI CI/CD pipeline completed.'
        }
    }
}