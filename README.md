# 김경석
## 6주차 2023-04-06
### CH05 컴포넌트와 props
#### 컴포넌트 추출
    > 큰 컴포넌트에서 일부를 추출해서 새로운 컴포넌트를 만드는 것.
     > 처음부터 1개의 컴포넌트에 하나의 기능만 사용하도록 설계하는 것이 좋다.
    
```js
ex - 이미지를 담당하는 Avatar 컴포넌트
    function Avatar(props) {
        return(
            <img className="Avatar"
                src={props.user.avatarUrl}
                alt={props.user.name}>
        );
    }

    export default Avatar;
```
만들어둔 컴포넌트를 사용할 때, 기존 컴포넌트에서는 꼭 위에 _**import**_ 로 감싸야하고, 
마지막에 export default를 해주어야 한다.
    > ※ 컴포넌트에 표시되는 내용을 동적으로 변경하기 위해서는 해당 요소를 _**props.요소**_
    로 변경하면 된다.
#### props 사용 예시
-> css 스타일과 html div 형식이 지정된 comment.jsx
```js
import React from "react";

const styles = {
    wrapper: {
        margin: 8,
        padding: 8,
        display: "flex",
        flexDirection: "row",
        border: "1px solid grey",
        borderRadius: 16,
    },
    imageContainer: {},
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    contentContainer: {
        marginLeft: 8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    nameText: {
        color: "black",
        fontSize: 16,
        fontWeight: "bold",
    },
    commentText: {
        color: "black",
        fontSize: 16,
    },
  }

function Comment(props){
    return (
        <div style={styles.wrapper}>
            <div style={styles.imageContainer}>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                    style={styles.image}
                />
            </div>
            <div style={styles.contentContainer}>
                <span style={styles.nameText}>{props.name}</span>
                <span style={styles.commentText}>{props.comment}</span>
            </div>
        </div>
    );
}

export default Comment;
```
-> comment.jsx를 import받아 변수에 들어갈 내용을 정의하고 페이지에 띄울 commentList.jsx
```js
import React from "react";
import Comment from "./Comment";

const comments = [
    {
        name: "유재석",
        comment: "안녕하세요, 유재석입니다.",
    },
    {
        name: "박명수",
        comment: "리액트 재미있어요~!",
    },
    {
        name: "정준하",
        comment: "저도 리액트 배워보고 싶어요!",
    },
];

function CommentList(props) {
    return(
        <div>
            {comments.map((comment) => {
                return(
                    <Comment name={comment.name} comment={comment.comment} />
                );
            })}
        </div>
    );
}


export default CommentList;
```
### CH06 State와 생명주기★★
**State**란?
    > 리액트 컴포넌트의 _**상태**_를 의미함.
     > _**상태**_란 정상/비정상 이 아닌 _**컴포넌트의 데이터**_를 의미한다.
      > 더 정확히는 컴포넌트의 _**변경가능한 데이터**_를 의미함.
    ※ State가 변하면 다시 렌더링이 되기 때문에 렌더링과 관련된 값만 state에 포함시켜야 한다.
 예시를 통해 알아보는 State의 특징
 ```js
 class LikeButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            liked: false
        };
    }
    ...
 }
 ```
    > 자바스크립의 객체이다. (react만의 특별한 개체가 아님.)
    > constructor는 생성자
예시++
```js
// state를 직접 수정 (잘못된 방법)
this.state = {
    name: 'Inje'
};

// setState 함수를 통한 수정 (정상적인 사용법)
this.setState({
    name: 'inJe'
});
```
    > state 변경 시에는 setState() 함수를 사용할 것.
비유를 통해 알아보는 component, element, instance
    Component -> 빵
    elelment -> 빵틀
    instance -> 재료
#### 생명주기
    **생명주기**란 컴포넌트의 생성 시점, 사용 시점, 종료 시점을 나타내는 것이다.
    1. constructor가 실행되면서 컴포넌트가 생성됨
    2. 생성 직후 componentDidMount() 함수가 호출됨.
    3. 컴포넌트 소멸 전까지 여러 번 렌더링함.
        > 렌더링은 props, setState(), forceUpdate() 에 의해 상태가 변경되면 이루어짐.
    4. 렌더링이 끝나면 componentDinUpdate() 함수가 호출됨.
    5. 마지막으로 컴포넌트가 언마운트 되면 componentWillUnmount() 함수가 호출됨.
    ※ **교재 183p 생명주기 사진 참고**
## 5주차 2023-03-30
### babel 링크 위치  
    > 구글 react 검색 - react 사이트
     > 문서 - cdn 링크 위로 두번째 탭 (웹 사이트에 react 추가하기)
      > 내리다보면 jsx 빠르게 시도해보기 밑에 링크가 있음
## 4주차 2023-03-23  
### react h태그 사용법  
    앞에 #을 붙인 갯수에 따라 h1 h2 h3..가 된다.  
    br태그의 경우 문장 뒤에 스페이스 두번을 누르면 됨. 
1. ol태그의 경우는 
2. 앞에 번호+.을 붙이고
3. 띄워주면
4. 차례로 들어가게 됨.  

### Bable이란?
    JSX를 컴파일 해줌.
### createElelment() 함수란?
    - 코드의 자동 검사, 수정
    - 자바스크립트로의 변환
### JSX의 장점
    코드가 간결해 진다.
    가독성이 향상된다.
    Injection Attack이라 불리는 해킹방법을 방어해 보안이 강함.
### JSX의 사용
    자바스크립트 문법 + XML, HTML을 섞어서 사용함.
    EX - const element = <h1> 안녕, {name}</h1>

    html, xml에 자바스크립트 코드를 사용할시 {}에 사용
    ※ 태그에 속성값을 넣고싶다면?
     - 큰따옴표 사이에 문자열 넣기
     const element = <div tabIndex="0"></div>;
     - 중괄호 사이에 자바스크립트 코드를 넣기
     const element - <img scr={user.avatarUrl}></img>;


<h2>3주차 2023-03-16</h2>
<br>
<h2>버전 확인 하는 법</h2>
<h3>$ □□□ --version / $ □□□ -v</h3>
<br>
<h2>리액트 개념 정리 1</h2>
<h3>복잡한 사이트를 쉽고 빠르게 제작, 관리하기 위해 만들어진 것.<br>
SPA를 쉽고 빠르게 만들 수 있도록 해주는 도구.<br>
// SPA = 페이지가 하나인 어플리케이션(Single Page Application)
</h3>
<br>
<h2>리액트의 장점</h2>
<h3>
1. 빠른 업데이트와 렌더링 속도 - Virtual DOM이 있어 가능<br>
// Virtual DOM 은 DOM 조작의 비효율로 인해 속도가 느려지는 것을 감안해 새로 고안한 방법.<br>
// DOM은 동기식 (웹페이지의 일부에 대한 갱신 등의 요청에 대해 그때그때 새로운 웹페이지를 생성해 전달해줌)<br>
// 그에반해 Virtual DOM은 비동기식(같은 요청에 대해 일부에 대한 정보만 갱신하여 전달해줌.)
<br>
2. 컴포넌트 기반 구조.<br>
하나의 페이지는 컴포넌트라는, 수많은 조각들에 의해 구성되어 있다.<br>
수정이 필요한 하나의 컴포넌트를 위해 다른 컴포넌트를 수정할 필요가 없어 유지보수에 편하다.
<br>
3. 재사용성<br>
반복적인 작업을 줄여주기에 생산성을 높여준다.<br>
유지보수가 용이하다. (장점2에 의해)<br>
--재사용이 가능하기 위해서는 해당 모듈의 의존성이 없어야만 한다.<br>
4. 오픈소스 프로젝트로 관리되고있어 계속 발전 중.<br>
5. 활발한 지식 공유 & 커뮤니티<br>
6. 모바일 앱의 개발이 가능함. (리액트 네이티브)<br>
</h3><br>
<h2>리액트의 단점<h2>
<h3>
1. 방대한 학습량 (BUT, 자바스크립트를 학습하고 있을 경우 시간이 단축됨)<br>
2. 높은 상태 관리 복잡도 (state, component life cycle 등의 개념 숙지 필요)<br>
</h3>