pipeline {
    environment {
        NICKNAME_PROJECT = "Exemplo"
        NAME_PROJECT = "nestjs-crud-example"
        PATH_GIT = "core/backend"
        PUSH_GIT_MASTER = "git checkout master && git merge develop && git push http://${USER_JENKINS}:${SENHA_JENKINS}@${SERVER_GIT}/${PATH_GIT}/${NAME_PROJECT}.git master"
        UPDATE_GIT_HOMO = "cd ${PATH_API_HOMO}/${NAME_PROJECT} && git checkout develop && git pull http://${USER_JENKINS}:${SENHA_JENKINS}@${SERVER_GIT}/${PATH_GIT}/${NAME_PROJECT}.git develop"
        UPDATE_GIT_PROD = "cd ${PATH_API_PROD_ARRE}/${NAME_PROJECT} && git pull http://${USER_JENKINS}:${SENHA_JENKINS}@${SERVER_GIT}/${PATH_GIT}/${NAME_PROJECT}.git master"
    }

    agent any

    stages {
        stage('preparation') {
            steps {
                echo 'Configurando...'
            }
        }

        stage('test') {
            steps {
                script {
                    try {
                        sh "${RUN_NODE_LINT}"
                    } catch(Exception e) {
                        rocketSend "${ERROR_STAGE_TEST}"
                        throw new Exception("Error ao realizar stage de test")
                    }
                }
            }
        }

        stage('pre-build') {
            steps {
                script {
                    try {
                        sh "${RUN_NODE_BUILD}"
                    } catch(Exception e) {
                        rocketSend 'Error ao realizar stage de pre-build'
                        throw new Exception("Error ao realizar stage de pre-build")
                    }
                }
            }
        }

        stage('deploy-homologação') {
            environment {
                DEPLOY_HOMO = "${UPDATE_GIT_HOMO} && ${DEPLOY_NODE_DOCKER_HOMO}"
            }
            steps {
                script {
                    try {
                        sh 'ssh -i key.pem ubuntu@host.com.br "$DEPLOY_HOMO"'
                        rocketSend "Api de ${NICKNAME_PROJECT} atualizada em homologação e aguardando aprovação para produção"
                    } catch(Exception e) {
                        rocketSend "${ERROR_STAGE_HOMO}"
                        throw new Exception("Error ao realizar stage de deploy no servidor de homologação")
                    }
                }
            }
        }


        stage('homologação-to-produção') {
            environment {
                PUSH_MASTER = "cd ${PATH_API_HOMO}/${NAME_PROJECT} && ${PUSH_GIT_MASTER} && git checkout develop"
            }
            steps {
                script {
                    input message: 'Deu certo no ambiente de homologação? (Clique em "Proceed" para continuar)'
                    sh '"$PUSH_MASTER"'
                }
            }
        }

        stage('deploy-produção') {
            environment {
                DEPLOY_MASTER = "${UPDATE_GIT_PROD} && ${DEPLOY_NODE_DOCKER_PROD} && git tag -a ${input id: 'idTag', message: 'Por favor insira a versão da TAG', ok: 'Avançar', parameters: [string(defaultValue: 'v1.0.0', description: '', name: 'tag')]} -m '' && git push http://${USER_JENKINS}:${SENHA_JENKINS}@${SERVER_GIT}/${PATH_GIT}/${NAME_PROJECT}.git --tags"
            }
            steps {
                script {
                    try {
                        sh 'ssh -i key.pem ubuntu@host.com.br "$DEPLOY_MASTER"'
                        rocketSend "Api de ${NICKNAME_PROJECT} Atualizada em produção"
                    } catch(Exception e) {
                        rocketSend "${ERROR_STAGE_PROD}"
                        throw new Exception("Error ao realizar stage de deploy no servidor de produção")
                    }
                }
            }
        }
    }
}
