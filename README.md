# 26project-Bae

프로젝트형 스터디 진행 계획서


이름 : 배현철  학번:22110096


제목 : 회원제 블로그 만들기

주제 설명

1)	프로젝트 개요
회원, Admin 등 을 탑재한 블로그 제작

2)	주요기능
Session Login, Sequelize ORM, 기본적인 보안, MVC Design Pattern
Bootstrap Framework를 이용한 기능적 디자인

user
1) user는 회원가입을 할 때, admin이 수락할 때 까지 사용이 불가하다.
2) user는 비밀번호를 5회 이상 맞추지 못 할 경우 접근이 제한된다.
3) user는 board를 만들 수 있으며, 이는 public, private으로 공개할 지, 비밀글로 할 지 구분이 가능하다.
4) user는 각 정보와 프로젝트를 포트폴리오 에다가 기입하여 후에 버튼을 클릭하여 pdf로 파일 저장이 가능하다.

admin
1) user, board 의 리스트를 열람 수정 삭제가 자유롭게 가능하다.
2) user의 정보를 볼 수 있지만, 비밀번호는 유추할수 없다.
3) admin은 user의 status를 변경하여 활성화 비활성화 등이 가능하다.

push
1) push는 admin 만이 만들 수 있다.
2) push는 user와 관계를 가진다.

board
1) board는 제목, 내용, 사진 등을 저장 할 수 있다.
2) board는 조회수 기능을 가진다.
3) board는 comment와 관계를 가진다. 

개발 환경 : JavaScript, HTML, CSS, MySQL

개발 계획 : 6월 25일 ~ 9월 1주차.

1주차
개발환경 세팅 및 구조 구상 / sql session seqeulize 를이용한 로그인 기능 개발.

2주차
user List = admin 권한을 가진 user만 확인가능하도록 기능 구현.
로그인 실패시 failStack++ -> 5회 틀리면 user_status = 1 이 되어, 계정 접속 제한 구현.
jQeury, Bootstrap 내장.

3주차
userList Pagination 구현.
Push 알림 구현.
admin은 회원 가입시 user_status = 2 로 만들고, admin에게 push 알림을 넣음.
admin은 push 알림 list에서 내용을 확인 후, 버튼을 클릭하여 user_status = 0 으로 user 활성화.

4주차
admin Page 구축.
(중간 발표)
Free Bootstrap template 로 홈페이지 디자인
multer를 이용하여 사진 업로드 기능 추가
게시글 기능 구상 및 구현.
+ 회원은 본인의 정보와 프로젝트 사진, 설명 등을 기입하여 원버튼 포트폴리오 구축을 구현

5주차
게시글 – 댓글 연결
+ 게시글 조회수 기능 구상

6주차
admin은 통계 수치로 방문횟수, 한 달간 제일 많이 클릭된 게시글 을 확인 기능 구현
Admin , User, Blog 기능 제작 완료

7주차
기본적인 보안, 로그 기능 활성화, 홈페이지 꾸미기

8주차

