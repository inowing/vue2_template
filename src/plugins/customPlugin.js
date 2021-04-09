// Vue.js 플러그인은install 메소드를 노출해야합니다. 이 메소드는 첫 번째 인자로 Vue 생성자와 함께 가능한 옵션과 함께 호출 될 것입니다.
// https://joshua1988.github.io/vue-camp/reuse/plugins.html#%ED%94%8C%EB%9F%AC%EA%B7%B8%EC%9D%B8-%EC%82%AC%EC%9A%A9-%EB%B0%A9%EB%B2%95
import Axios from 'axios'

export default {
    install (Vue, options) {
        Vue.prototype.$http = Axios;

        // this.$showMsgBoxTwo(response.status, 'insert', '하고픈말'); 
        Vue.prototype.$msgBox = function (status, type, inputMessage, callback) {
            let msg = '';
            let okVariant = '';
            if (status == 200) {
                let methodof = {
                    insert: "저장",
                    delete: "삭제",
                    update: "수정"
                }
                msg = inputMessage ? inputMessage : `성공적으로 ${methodof[type]||'저장'}되었습니다.`;
                okVariant = 'success';
            } else {
                msg = `${status} : ${inputMessage}`||'실패 하였습니다.';
                okVariant = 'danger';
            }
            
            this.boxTwo = ''
            this.$bvModal.msgBoxOk(msg, {
                title: 'Confirmation',
                size: 'sm',
                buttonSize: 'sm',
                okVariant,
                headerClass: 'p-2 border-bottom-0',
                footerClass: 'p-2 border-top-0 ino-msg-footer-btn-100',
                centered: true
            })
                .then(value => {
                    this.boxTwo = value;
                    if (value) {
                        callback();
                    }
                })
                .catch(err => {
                    // An error occurred
                })
        }
 
        Vue.prototype.$toast = function (title, inputMessage, variant) {
            this.$bvToast.toast(inputMessage, {
                title,
                autoHideDelay: 2000,
                variant: variant||'success',
                solid: true
            })
        }
        
        Vue.prototype.onFileChange = function (event, property, obj) {
            const file = event.target.files[0];
            if (obj) {
                obj[property] = URL.createObjectURL(file);
            } else {
                this[property] = URL.createObjectURL(file);
            }
        }
    }
    
}