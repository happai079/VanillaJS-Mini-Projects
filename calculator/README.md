## :star: Calculator

HTML / CSS / Vanilla JS
<br/>

![calculator](https://user-images.githubusercontent.com/76716519/132009917-a8681291-4b70-4838-9f2f-813bf167a454.gif)

## 🔨 What I Made

```
1. 숫자, 연산자, +/-, %, . 버튼 클릭시 디스플레이 화면에 해당 값 표시
2. C 버튼 클릭시 입력된 모든 값 삭제
3. ← 버튼 클릭시 마지막 입렫된 값 삭제
4. = 버튼 클릭시 현재까지 입려된 값 계산 후 output 디스플레이에 표시
5. 1~4까지 반복 실행 가능
```

## :question: What I Learn

#### 1. HTML: Data 속성

- 'data-'로 시작하는 사용자 지정 데이터 특성
- value 속성과 관련이 없기 때문에 hidden으로 태그를 숨겨둘 필요없이 데이터를 저장할 수 있다.
- 자바스크립트에서 접근하는 방법은 dataset객체를 통해 data- 뒷 부분을 사용한다.<br/>
  단, 대시들은 camelCase로 변환된다.

```html
<input
	type="text"
	id="name"
	data-value="user01"
	data-code="c01"
	data-user-name="Park"
/>
```

```javascript
const input = document.querySelector('#name');
console.log(input.dataset.value); // user01
console.log(input.dataset.code); // c01
console.log(input.dataset.userName); // Park
```

- IE10 이하 버전은 getAttribute()을 통해 접근해야 한다.

---

#### 2. CSS: Grid

- flex는 한 방향(1차원) 레이아웃 시스템인 반면 grid는 두 방향(2차원) 레이아웃 시스템이다.
- 그리드 컨테이너 : display: grid 를 적용하는 전체 영역
- 그리드 아이템 : 그리드 컨테이너의 자식 요소들
- 그리드 트랙: 그리드의 행(row) 또는 열(column)
- 그리드 셀: 그리드의 한 칸, 그리드 아이템 하나가 들어가는 '가상의 칸'
- 그리드 라인: 그리드 셀을 구분하는 선
- 그리드 번호: 그리드 라인의 각 번호
- 그리드 갭: 그리드 셀 사이의 간격
- 그리드 영역: 그리드 라인으로 둘러싸인 사각형 영역, 그리드 셀의 집합

참고: [CSS Grid-MDN](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Grid_Layout)
[CSS Grid-Blog](https://studiomeal.com/archives/533)

---

#### 3. JavaScript: Class

- class: 객체 지향 프로그래밍에서 특정 객체를 생성하기 위해 변수와 메소드를 정의하는 일종의 틀, 객체를 정의하기 위한 상태(멤버변수)와 메서드(함수)로 구성된다. [위키백과](<https://ko.wikipedia.org/wiki/%ED%81%B4%EB%9E%98%EC%8A%A4_(%EC%BB%B4%ED%93%A8%ED%84%B0_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D)>)

- new 연산자를 통해 생성

```javascript
class User {
	// 멤버 변수
	constructor(name) {
		this.name = name;
	}

	// 메서드
	sayHi() {
		console.log(`Hi ${this.name}`);
	}
}
```

```javascript
const user = new User('Park');
user.sayHi(); // 'Hi Park'
```

- class로 만든 함수엔 특수 내부 프로퍼티인 `[[FunctionKind]:"classConstructor"]`가 있다.<br/>
  자바스크립트는 함수에 `[[FunctionKind]:"classConstructor"]`이 있는지를 확인하기 때문에 클래스 생성자를 `new`와 함꼐 호출하지 않으면 에러가 발생한다.

참고: [class-모던 자바스크립트](https://ko.javascript.info/class) [class-MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/class)

---

#### 4. JavaScript: this

- 일반 함수 안에서 사용하면 window(글로벌 객체)를 의미

```javascript
console.log(this === window); // true

function x() {
	return this;
}

x() === window; // true
```

- 메서드 안에서 사용하면 메서드를 호출한 객체를 의미

```javascript
const user {
  name: "Park",
  age: 20,
  drinkWater() {
    console.log(`${this.name} drinks water.`);
  }
}

user.drinkWater(); // 'Park drinks water.'
```

- 생성자(constructor) 안에서 사용하면 그 생성자로 새로 생성되는 객체를 의미

```javascript
function Person() {
	(this.name = 'Park'),
		(this.age = 20),
		(this.drink = function () {
			console.log(`${this.name} drinks water.`);
		});
}
const person1 = new Person();
console.log(person1); // Person { name: "Park", age: 20, drink: f}
```

- 이벤트 리스너 안에서 사용하면 event.target(이벤트를 발생시킨 요소)과 일치

```html
<button id="button">버튼</button>
<script>
	document.getElementByI('button').addEventListene('click', function (e) {
		console.log(e.target);
		//<button id="button">버튼<button>
		console.log(this);
		//<button id="button">버튼<button>
	});
</script>
```

참고: [this-MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

---

#### 5. JavaScript: 재귀 함수

- 함수내부에서 자기 자신을 다시 호출하는 구조의 함수
- 반드시 종료 조건이 있어야 함
  - 재귀 호출을 중단시키는 조건 문장을 `Base case` 또는 `Termination case`라고 함
- 재귀 함수를 사용하면 함수의 호출이 스택에 차곡 차곡 쌓이게 되고, 위에서부터 차례대로 값을 반환하기 전에는 계속 메모리 공간을 차지하고 있기 때문에 메모리 효율이 좋지 못 할 수도 있음
  - 따라서 경우에 따라 그냥 반복문을 사용하는게 더 나을 수 있음

---

#### 6. JavaScript: eval()

- eval() : 문자로 표현된 자바스크립트 코드를 실행하는 함수

##### :x: eval() 함수를 사용하면 안 되는 이유

1. eval()은 인자로 받은 코드를 caller의 권한으로 수행하는 위험한 함수

2. 악의적인 영향을 받았을 수 있는 문자열을 eval()로 실행한다면, 해당 웹페이지나 확장 프로그램의 권함으로 사용자의 기기에서 악의적인 코드를 수행하는 결과를 초래

3. 제3자 코드가 eval()이 호출된 위치의 스코프를 볼 수 있으며, 이를 이용해 비슷한 함수인 Function으로는 실현할 수 없는 공격이 가능

4. 최신 JS 엔진에서 여러 코드 구조를 최적화하는 것과 달리 eval()은 JS 인터프리터를 사용해야 하기 때문에 다른 대안들보다 느림

- 최신 자바스크립트 인터프리터는 코드를 기계 코드로 변환함. 즉, 변수명의 개념이 완전히 사라짐
- eval()을 사용하면 브라우저는 기계 코드에 해당 변수가 있는지 확인하고 값을 대입하기 위해 길고 무거운 변수명 검색을 수행해야 함
- eval()을 통해 자료형 변경 등 변수에 변화가 일어날 수 있으며, 브라우저는 이에 대응하기 위해 기계 코드를 재작성해야 함

참고 : [eval() - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/eval#eval%EC%9D%84_%EC%A0%88%EB%8C%80_%EC%82%AC%EC%9A%A9%ED%95%98%EC%A7%80_%EB%A7%90_%EA%B2%83!)
