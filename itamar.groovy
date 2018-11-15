pipeline {
    agent none
    stages {
        stage ('unit-testing') {
            agent {
                label 'backend-dev'
            }
            when {
            not { branch 'master' }
            }            
            steps {
                sh 'sudo service mongod start'
                sh 'npm install'
                sh 'wget 23.100.60.0:3000/wildcard.key'
                sh 'wget 23.100.60.0:3000/wildcard.pem'
                sh 'npm test'
            }
        }
        stage ('deploy') {
            agent {
                label 'backend-prod'
            }
            when { branch 'master' }
            steps {
                sh 'sudo service mongod start'
                sh 'npm install'
                sh 'npm test'
                sh 'npm start &'
            }
        }    
    }
}
