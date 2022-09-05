# 26project-Bae
```
프로젝트형 스터디 진행 계획서


이름 : 배현철  학번:22110096
```

# 동기
방학 중, 개인 프로젝트로 여러 사이트에서 사용되는 로그인 등 특정 기능들을 

<hr/>

# 제목
회원제 블로그 만들기

<hr/>

# 프로젝트 개요
회원, Admin 등 을 탑재한 블로그 제작

<hr/>

# Package.json
![스크린샷 2022-09-05 오후 7 07 33](https://user-images.githubusercontent.com/72017202/188424639-fad5f9e6-0412-49c2-82c6-fe1977673236.png)

<hr/>

# 주요기능
Session Login, Sequelize ORM, 기본적인 보안, MVC Design Pattern
Bootstrap Framework를 이용한 기능적 디자인


![스크린샷 2022-09-05 오후 6 56 20](https://user-images.githubusercontent.com/72017202/188422469-d6feac9f-fa11-4a43-b214-78683d48af69.png)

```html
      <div class="modal fade" id="signinModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Sign In</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form action="/user" method="POST">
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">Email :</label>
                  <input type="text" name="email" class="form-control" id="recipient-name">
                </div> 
                <div class="mb-3">
                  <label for="message-text" class="col-form-label">Password :</label>
                  <input type="password" class="form-control" id="message-text" name="password"></textarea>
                </div>

                <button class="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Log In</button>
              </form>
            </div>
            <div class="modal-footer">
            </div>
          </div>
        </div>
      </div>
      
     <script type="text/javascript">
        $(function(){
          
            $("#alert-success").hide();
            $("#alert-danger").hide();
            $("#submit").hide();
            $("input").keyup(function(){
                var pwd1=$("#password").val();
                var pwd2=$("#password2").val();
                if(pwd1 != "" || pwd2 != ""){
                    if(pwd1 == pwd2){
                        $("#alert-success").show();
                        $("#alert-danger").hide();
                        $("#submit").show();
                    }else{
                        $("#alert-success").hide();
                        $("#alert-danger").show();
                        $("#submit").hide();
                    }    
                }
            });
        });
    </script>
```
- 로그인 폼, 회원가입 폼은 Bootstrap을 활용하여 Modal 형태로 만들었습니다.

```javascript
async function getUsers(req,res){
    let page = req.query.page;
    if(page == undefined){page = 1;}
    let limit = 10;
    let offset = 0 + (page - 1) * limit;
    let userAuth = req.session.userAuth;
    try{
        if(userAuth == 1){
            let data = await userService.getUsers(offset,limit);
            return res.render('user/user_list',{pageNum:page,limit:limit,count:data.count,data:data.rows,
                name:req.session.userName, id:req.session.userId,auth:req.session.userAuth})
        }else{
            res.redirect('/user');
        }
    }catch(err){
        return res.status(500).json(err);
    }
}

// 아래 코드는 userService.getUsers에 대한 코드입니다
        let data = await models.user.findAndCountAll({
            //학번순으로 오름차순 정렬
            offset: offset,
            limit: limit,
            order:[['number','asc']],
            where:{auth:0}
        });
```

 - offset과 limit으로 표시할 가짓수들과, 총 데이터 수를 출력합니다.

```javascript
<nav aria-label="Page navigation">
            <ul class="pagination  justify-content-center">
              <li class="page-item">
                <a class="page-link" href="?page=1" aria-label="Previous">
                  <span aria-hidden="true">&laquo; First</span>
                </a>
              </li>
              <% let lastPage = Math.ceil(count/limit)%>
              <% %>
              <% for(let page = 1 ; page <= lastPage; page++){ %>
                <% if(pageNum == page){ %>
                    <li class="page-item active">
                <% }else{ %>
                    <li class="page-item">
                <% } %>
                    <a href="?page=<%= page%>" class="page-link"><%= page%></a>
                </li>
              <% } %>
              <li class="page-item">
                
                <a class="page-link disabled" href="?page=<%= lastPage%>" aria-label="Next">
                  <span aria-hidden="true">Last &raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
```
 - Pagination(ejs)

```javascript
router.post('/', userController.loginUser);
// 로그아웃
router.get('/logout', userController.logOutUser);
//회원가입 폼 페이지 + 가입
router.post('/insert',userController.insertUser);
// 관리자용 회원 리스트 확인
router.get('/list', userController.getUsers);
// 정보, 업데이트, 삭제
router.get('/:id',userController.getUser);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

<hr/>
//var methodOverride = require('method-override');
//app.use(methodOverride('_method'));
```
 - Restful API 를 활용하기위해, methodOverride 라는 middleware를 사용하였습니다.

```javascript
const nodemailter = require('nodemailer')
const senderInfo = require('../config/senderInfo.json');
const adminEmail = require('../config/config.json');
const mailSender = {
    sendGmail : function (param){
        var transporter = nodemailter.createTransport({
            service: 'gmail',
            prot: 587,
            host: 'smtp.gmlail.com',
            secure: false,
            requireTLS: true,
            auth:{
                user: senderInfo.user,
                pass: senderInfo.pass
            }
        });
        var mailOptions = {
            from: senderInfo.user,
            to: adminEmail.admin,
            subject: param.subject,
            text: param.text
        };
        transporter.sendMail(mailOptions,function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log('Email sent: ' + info.response);
            }
        });
    }
}
module.exports = mailSender;
```

 - NodeMailer 를 통한 특정 상황 발생 시, gmail로 알림 (config/senderInfo.json 에 메일을 보내는 계정에 대한 정보를 기입함)
 

```javascript
async function loginUser(req,res){
    const {email,password} = req.body
    try{
        let user = await userService.logInUser(email);
        const compare = bcrypt.compareSync(password,user.password);
        //비밀번호가 같고, user_status가 0 (활성화) 상태인 경우에만 session 활성
        if(compare && user.user_status == 0){
            //로그인에 성공 시, failStack 0으로 초기화
            await userService.loginSuccess(email);
            console.log('access');
            sess = req.session;
            sess.userName = user.name;
            sess.userId = user.id;
            sess.userAuth = user.auth;
            return res.redirect('/');
        }else{
            //로그인 실패 시 || user_status != 0 (활성화가 아닐 시), stack 1증가.
            console.log('access denied');
            if(user.user_status == 1){
                console.log(email+": 계정 이용 제한");
                //계정 잠금시, admin 에게 email 발송
                let msgInfo = {
                    subject:email + ": 계정 이용 제한",
                    text: email+ "유저가 로그인을 수회 실피하여 계정 잠금"
                }
                mailer.sendGmail(msgInfo);
            }else{
                await userService.loginFail(email);
            }
            return res.redirect('/user');
        }
    }catch(err){
        console.log(err);
        return res.redirect('/user');
    }
}
```
 - 로그인 controller



#개발 과정

```
user
1) user는 회원가입을 할 때, admin 에게 메일이 발송되고, admin이 확인후 수락 할 때 까지 사용이 불가하다.
2) user는 비밀번호를 5회 이상 맞추지 못 할 경우 접근이 제한된다.
```

```
admin
1) user, board 의 리스트를 열람 수정 삭제가 자유롭게 가능하다.
2) user의 정보를 볼 수 있지만, 비밀번호는 유추할수 없다.
3) admin은 user의 status를 변경하여 활성화 비활성화 등이 가능하다.
4) admin은 db 상으로만 update가 가능하다
```

```
board
1) board는 제목, 내용 등을 저장 할 수 있다.
2) board는 comment와 관계를 가진다.
```


#개발 환경 : JavaScript, HTML, CSS, MySQL

#개발 계획 : 6월 25일 ~ 9월 1주차.
```
1주차
개발환경 세팅 및 구조 구상 / sql session seqeulize 를이용한 로그인 기능 개발.
```

```
2주차
user List = admin 권한을 가진 user만 확인가능하도록 기능 구현.
로그인 실패시 failStack++ -> 5회 틀리면 user_status = 1 이 되어, 계정 접속 제한 구현.
jQeury, Bootstrap 내장.
```
```
3주차
userList Pagination 구현.
admin은 회원 가입시 user_status = 1 로 만들고, admin에게 gmail로 알림.
admin은 gmail 내용을 확인 후, 버튼을 클릭하여 user_status = 0 으로 user 활성화.
```
```
4주차
admin Page 구축.
Free Bootstrap template 로 홈페이지 디자인
게시글 기능 구상 및 구현.
```
```
5주차
게시글 – 댓글 연결
+ 게시글 조회수 기능 구상
```
```
6주차
Admin , User, Blog 기능 제작 완료
```
```

7주차
기본적인 보안, 로그 기능 활성화, 홈페이지 꾸미기
```
<hr/>

#개선해야 할 점
```
 board.id 와 comment.board_id 를 FK로 맺어놓고 seqeulize-auto 로 db정보를 자동으로 넘기면
join 문으로 한번에 불러오지 못하는 Issue가 있었습니다.

 위 문제에 관하여 해결방법을 여러방면으로 검색하였으나, 명확히 해결되지않아 sequelize-auto 를 사용하지않고
cli로 schema 를 기입해야 한다는 점을 너무 늦게 깨달은 점이 아쉽습니다.
```

