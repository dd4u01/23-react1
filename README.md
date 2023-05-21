# 김경석  
## 12주차 2023-05-18  
### CH13 - 합성이란  
    >  여러개의 컴포넌트를 합쳐서 새로운 컴포넌트를 만드는 것
        > Containment -> 하위 컴포넌트를 포함하는 형태의 합성 방법
```js
props에 기본적으로 들어있는 children 속성을 사용한 Containment 사용예시

function FancyBorder(props){
    return(
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
        </div>
    );
}
```
### Specailization (전문화, 특수화)  
    > 범용적인 개념을 구별이 되게 구체화 하는 것
```js
코드를 통한 예시
function Dialog(props) {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
                {props.title}
            </h1>
            <p className="Dialog-message">
                {props.message}
            </p>
        </FancyBorder>
    );
}
function WelcomeDialog(props){
    return(
        <Dialog
            title="어서오세요"
            message="우리 사이트에 방문하신 것을 환영합니다!"
        />
    );
}

-> title 과 message props를 사용하는 방식에 따라 경고 Dialog, 인사 Dialog 등으로 특수한 활용이 가능.
```

### CH14 - 컨텍스트란?  
    > 컴포넌트 트리를 통해 곧바로 컴포넌트에 전달하는 새로운 방식  
        > 380pg 그림 참고  
#### 컨텍스트 사용 예시  
```js
// 컨텍스트는 데이터를 매번 컴포넌트를 통해 전달할 필요 없이 컴포넌트 트리로 곧바로 전달  
// 기본값이 'light'인 컨텍스트를 생성.  
const ThemeContext = React.createContext('light');

// Provider를 사용하여 하위 컴포넌트들에게 현재 테마 데이터를 전달  
// 모든 하위 컴포넌트들은 컴포넌트 트리 하단에 얼마나 깊이 있는지에 관계없이 데이터를 읽을 수 있음.  
// 현재 테마값으로는 'dark'를 전달중  
function App(props){
    return(
        <ThemeContext.Provider value="dark">
            <Toolbar />
        </ThemeContext.Provider>
    );
}

// 이로써 중간에 위치한 컴포넌트는 테마 데이터를 하위 컴포넌트로 전달할 필요가 없음.  
function Toolbar(props) {
    return(
        <div>
            <ThemedButton />
        </div>
    );
}

function ThemedButton(props){
    // 리액트는 가장 가까운 상위테마 Provider를 찾아서 해당 값을 사용한다.  
    // 만약 해당되는 Provider가 없을 경우 기본값(light)을 사용한다.  
    // 여기서는 상위 Provider가 있기 떄문에 현재 테마의 값은 'dark'가 된다.  
    return(
        <ThemeContext.Consumer>
            {value => <Button theme={value} />}
        </ThemeContext.Consumer>
    )
}
```
## 11주차 2023-05-11 
### 폼이란
    > 사용자로부터 입력을 받기 위해 사용하는 것
### 제어 컴포넌트
    > 사용자가 입력한 값에 접근하고 제어할 수 있도록 해주는 컴포넌트
        > 그 값이 리액트의 통제를 받는 입력 폼 엘리먼트
```js
제어컴포넌트 예시
const handleChange = (event) => {
    setValue(event.target.value.toUpperCase());
}
// handleChange() 함수로 들어오는 이벤트의 타겟 값을 toUpperCase() 함수를 통해 대문자로 변경 후 state에 저장하는 역할
```
### textarea 태그
    > 여러 줄에 걸쳐서 나오게 될 긴 텍스트를 입력받기 위한 HTML 태그.
```js
<textarea>
    안녕하세요, 여기에 이렇게 텍스트가 들어가게 됩니다.
</textarea>
```
### select 태그
    > 드롭다운 목록을 보여주기 위한 HTML 태그.
        > <option> 태그를 <select> 태그가 감싸는 형태로 사용됨.
```js
<select>
    <option value="apple">사과</option>
    <option value="banana">바나나</option>
    .
    .
    .
</select>

※목록에서 다중으로 선택이 되도록 하려면?
    > multiple 이라는 속성값을 true로

<select multiple={true} value={['B','C']}>
```
### File input 태그
    > 디바이스의 저장 장치로부터 사용자가 하나 또는 여러개의 파일을 선택할 수 있게 해주는 HTML 태그
```js
<input type="file" />
```
## 10주차 2023-05-04  
### CH10 리스트(2)  
#### 리스트 와 키 란 무엇인가?  
    > 리스트(list) 란 자바스크립트의 변수나 객체를 하나의 변수로 묶어놓은 배열과 같은 것.
    > 키는 각 객체나 아이템을 구분할 수 있는 고유한 값을 의미한다.
    ※ 리액트에서는 배열과 키를 사용하는 반복되는 다수의 엘리먼트를 쉽게 렌더링할 수 있다.
#### 여러 개의 컴포넌트 렌더링하기  
    > 같은 컴포넌트를 화면에 반복적으로 나타내야 할 경우  
        -> 배열에 들어있는 엘리먼트를 map() 함수를 이용하여 렌더링.

```js
map()함수 사용 예제
    const doubled = numbers.map((number) => number * 2);

※ numbers 배열에 들어있는 각 숫자에 2를 곱한 값이 들어간 doubled 라는 배열을 생성하는 코드
```
#### 키(Key)  
    > 리스트에서 아이템을 구분하기 위한 고유한 문자열
    ※ 리액트에서의 키의 값은 같은 리스트에 있는 엘리먼트 사이에서만 고유한 값이면 된다.
## 7주차 2023-04-13
### CH07 훅
#### 훅(Hook)이란?
    > 'state와 생명주기 기능에 갈고리를 걸어 원하는 시점에 정해진 함수를 실행되도록 만든 함수'
    > 함수형 컴포넌트에서 state나 생명주기 함수의 기능을 사용하게 해주기 위해 추가된 기능
        > 훅을 통해 클래스형 컴포넌트의 기능을 함수형 컴포넌트에서 동일하게 구현 가능.
※ 훅의 이름은 모두 _**use**_ 로 시작한다.

#### useState() 함수
    > useState는 함수형 컴포넌트에서 state를 사용하기 위한 Hook 이다.

```js
    const [변수명, set함수명] = useState(초깃값);
```
    1. 첫 번째 항목은 state의 이름(변수명)이고,
    2. 두 번째 항목은 state의 set함수, 즉 state를 업데이트 하는 함수.
    3. 함수를 호출 할 때 state의 초깃값을 설정한다.
    4. 함수의 리턴 값은 배열의 형태이다.

#### useEffect
    > _사이드 이펙트_ 를 수행하기 위한 함수.

※ 사이드 이펙트의 두 가지 의미
    1. '개발자가 의도하지 않은 코드가 실행되면서 버그가 발생하는 것'
    2. 부수적인 **효과** 또는 **영향** 을 뜻하는 effect의 의미.
결국 sideEffect란 렌더링 외에 실행해야 하는 부수적인 코드를 말한다.  
useEffect() 함수는 다음과 같이 사용하는데,
```js
    useEffect(이펙트 함수, 의존성 배열);
```
첫 번째 파라미터는 _이펙트 함수_ 가 들어가고, 두 번째 파라미터로는 _의존성 배열_ 이 들어간다.  
**의존성 배열** 은 이펙트가 의존하고 있는 배열로, '배열 안에 있는 변수 중에 하나라도 값이 변경되었을 때' 이펙트 함수가 실행된다.  
**이펙트 함수** 는 _처음 컴포넌트가 렌더링 된 이후_ , 그리고 _재 렌더링 이후_ 에 실행된다.  
※ 만약 이펙트 함수가 마운트과 언마운트 될 때만 '한 번씩' 실행되게 하고싶으면, 의존성 배열에 빈 배열( [] ) 을 넣으면 된다.
    > 이 경우 props나 state에 있는 어떤 값에도 의존하지 않는 것이 되므로 여러번 실행되지 않는다.
    > 생략할 경우 컴포넌트가 업데이트될 때마다 호출된다.
```js
예시 코드

import React, { useState, useEffect } from "react";

function Counter(props) {
    const[count, setCount] = useState(0);

    //componentDidMount, componentDidUpdate와 비슷하게 작동함.
    useEffect(() => {
        //브라우저 API를 사용해서 document의 title을 업데이트
        document.title = `총 ${count}번 클릭했습니다.`;
    });

    return(
        <div>
            <p> 총 {count} 번 클릭했습니다.</p>
            <button onClick={() => setCount(count+1)}>
                클릭
            </button>
        </div>
    )
}
```
```js
정리

useEffect(() => {
    // 컴포넌트가 마운트 된 이후,
    // 의존성 배열에 있는 변수들 중 하나라도 값이 변경되었을 때 실행됨
    // 의존성 배열에 빈 배열([]) 을 넣으면 마운트와 언마운트시에 단 한 번 씩만 실행됨
    // 의존성 배열 생략 시 컴포넌트 업데이트 시 마다 실행됨.

    return() => {
        // 컴포넌트가 마운트 해제되기 전에 실행됨.
    }
}, [의존성 변수1, 의존성 변수2, ...]);
```
#### useMemo
    > useMemo() 혹은 Memoizde value를 리턴하는 훅.
    1. 이전 계산값을 갖고 있기 때문에 연산량이 많은 작업의 반복을 피할 수 있다.
    2. 이 훅은 렌더링이 일어나는 동안 실행됨.
    3. 따라서 렌더링이 일어나는 동안 실행되서는 안될 작업을 넣으면 안된다.
        > 예를 들면 useEffect에서 실행되어햐 할 사이드 이펙트 같은 것들.
```js
예시 코드

const memoizedValue = useMemo(() => {
    // 연산량이 높은 작업을 수행하여 결과를 반환
    return computeExpensiveValue(의존성 변수1, 의존성 변수2);
    }, [의존성 변수1, 의존성 변수2]
);
```
※ 교재 218pg eslint-plugin-react-hooks 패키지 참고

#### useCallback()
    > useMemo() 훅과 유사한 역할을 하나 **값이 아닌 함수를 반환한다** 는 차이점이 있음.
#### useRef()
    > 레퍼런스를 사용하기 위한 훅.
        > 레퍼런스란 _특정 컴포넌트에 접근할 수 있는 객체_ 를 의미한다.
    > useRef() 훅은 이 레퍼런스 객체를 반환함.
    > 이렇게 반환된 레퍼런스 객체는 '컴포넌트의 라이프타임 전체' 에 걸쳐서 유지된다.
        > 즉 컴포넌트가 마운트 해제 되기 전까지는 계속 유지된다는 의미이다.
#### 훅의 규칙
    1. 무조건 최상(컴포넌트)의 레벨에서만 호출해야 한다.
        > 반복문, 조건문 또는 중첩된 함수들 안에서 훅을 호출해서는 안된다.
        > 이 규칙에 따라 훅은 컴포넌트가 렌더링 될 때마다 같은 순서로 호출되어야 한다.
        ※ 224pg에 잘못된 코드의 예시가 있음.
    2. 리액트 함수형 컴포넌트에서만 훅를 호출해야 한다.(클래스형 x)
        > 일반 자바스크립트 함수에서도 훅을 호출해서는 안된다.
필요하다면 직접 훅을 만들어 쓸 수도 있다. 이를 **커스텀 훅** 이라 한다.  
커스텀 훅을 만들어야 하는 상황 예시
    1. state에 따라 사용자의 상태가 온라인인지 아닌지 텍스트로 보여주는 컴포넌트 - 226p
    2. 1의 웹사이트에서 연락처 목록을 제공하는데 이때 온라인인 사용자의 이름은 초록색으로 표시해 주는 컴포넌트 - 227pg

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
    > 리액트 컴포넌트의 _**상태**_ 를 의미함.
     > _**상태**_ 란 정상/비정상 이 아닌 _**컴포넌트의 데이터**_ 를 의미한다.
      > 더 정확히는 컴포넌트의 _**변경가능한 데이터**_ 를 의미함.
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
#### 비유를 통해 알아보는 component, element, instance
    > Component -> 빵
    > elelment -> 빵틀
    > instance -> 재료
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