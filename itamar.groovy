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
                sh 'npm test'
                sh 'cd ..'
                sh 'wget 23.100.60.0/wildcard.key'
                sh 'wget 23.100.60.0/wildcard.key'
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
