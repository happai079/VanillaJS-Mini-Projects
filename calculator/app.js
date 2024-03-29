class Calculator {
	constructor(input, output) {
		this.inputDisplay = input; // input을 보여주는 엘리먼트
		this.outputDisplay = output; // output을 보여주는 엘리먼트
		this.percentToggle = true; // percent를 토글로 만들기 위한
		this.inputHistory = []; // input을 저장하는 배열
	}

	// C 버튼 클릭시 동작
	clear() {
		this.inputHistory = [];
		this.updateInputDisplay();
		this.updateOutputDisplay('0');
	}

	// ← 버튼 클릭시 동작
	delete() {
		switch (this.getLastInputType()) {
			case 'number':
				if (this.getLastInputValue().length > 1) {
					this.editLastInput(this.getLastInputValue().slice(0, -1), 'number');
				} else {
					this.deleteLastInput();
				}
				break;
			case 'operator':
				this.deleteLastInput();
				break;
			default:
				return;
		}
	}

	// % 버튼 클릭시 동작 - toggle
	changePersentToDecimal() {
		if (this.getLastInputType() === 'number') {
			if (this.percentToggle === true) {
				this.editLastInput(this.getLastInputValue() / 100, 'number');
				this.percentToggle = false;
			} else {
				this.editLastInput(this.getLastInputValue() * 100, 'number');
				this.percentToggle = true;
			}
		}
	}

	// 숫자 버튼 클릭시 동작
	insertNumber(value) {
		if (this.getLastInputType() === 'number') {
			this.appendToLastInput(value);
		} else if (
			this.getLastInputType() === 'operator' ||
			this.getLastInputType() === null
		) {
			this.addNewInput(value, 'number');
		}
	}

	// 연산자 버튼 클릭시 동작
	insertOperation(value) {
		switch (this.getLastInputType()) {
			case 'number':
				this.addNewInput(value, 'operator');
				break;
			case 'operator':
				this.editLastInput(value, 'operator');
				break;
			case 'equals':
				let output = this.getOutputValue();
				this.clearAllHistory();
				this.addNewInput(output, 'number');
				this.addNewInput(value, 'operator');
				break;
			default:
				return;
		}
	}

	// +/- 버튼 클릭시 동작
	negateNumber() {
		if (this.getLastInputType() === 'number') {
			this.editLastInput(parseFloat(this.getLastInputValue()) * -1, 'number');
		}
	}

	// . 버튼 클릭시 동작
	insertDecimalPoint() {
		if (
			this.getLastInputType() === 'number' &&
			!this.getLastInputValue().includes('.')
		) {
			this.appendToLastInput('.');
		} else if (
			this.getLastInputType() === 'operator' ||
			this.getLastInputType() === null
		) {
			this.addNewInput('0.', 'number');
		}
	}

	// = 버튼 클릭시 동작
	generateResult() {
		if (this.getLastInputType() === 'number') {
			const self = this;

			// reducer 함수
			const simplifyExpression = function (currentExperssion, operator) {
				if (currentExperssion.indexOf(operator) === -1) {
					return currentExperssion;
				} else {
					// 현재 표현식에서 연산자와 좌항, 우항 분리
					let operatorIdx = currentExperssion.indexOf(operator);
					let leftOperandIdx = operatorIdx - 1;
					let rightOperandIdx = operatorIdx + 1;

					// 연산
					let partialSolution = self.performOperation(
						...currentExperssion.slice(leftOperandIdx, rightOperandIdx + 1)
					);

					// 현재 표현식을 연산 결과값으로 변경
					currentExperssion.splice(leftOperandIdx, 3, partialSolution.toString());

					// 재귀 함수 : 연산자가 여러개 일 수 있기 때문에
					return simplifyExpression(currentExperssion, operator);
				}
			};

			//  ['/', '*', '+', '-'] 순서대로 돌아가면서 reducer 함수 실행, 초기값은 현재 input 값
			let result = ['/', '*', '+', '-'].reduce(
				simplifyExpression,
				this.getAllInputValues()
			);

			this.inputHistory.push({
				type: 'number',
				value: Number(result).toLocaleString(),
			});

			this.inputHistory = this.inputHistory.splice(
				this.inputHistory.length - 1,
				1
			);

			this.updateOutputDisplay(result.toString());
		}
	}

	// inputHistory가 빈 배열이 아니면, 마지막 요소의 type을 반환
	getLastInputType() {
		return this.inputHistory.length === 0
			? null
			: this.inputHistory[this.inputHistory.length - 1].type;
	}

	// inputHistory가 빈 배열이 아니면, 마지막 요소의 value를 반환
	getLastInputValue() {
		return this.inputHistory.length === 0
			? null
			: this.inputHistory[this.inputHistory.length - 1].value;
	}

	// inputHistory 배열에 value만 저장히여 반환
	getAllInputValues() {
		return this.inputHistory.map((entry) => entry.value);
	}

	/* string.replace() : 새로운 문자로 교체할 때 사용
    outputDisplay에서 ','를 ''로 교체하여 반환 
  */
	getOutputValue() {
		return this.outputDisplay.value.replace(/,/g, '');
	}

	// inputHistory에 새로운 요소 추가
	addNewInput(value, type) {
		this.inputHistory.push({ type: type, value: value.toString() });
		this.updateInputDisplay();
	}

	// inputHisory 마지막 요소의 value에 새로운 value 추가
	appendToLastInput(value) {
		this.inputHistory[this.inputHistory.length - 1].value += value.toString();
		this.updateInputDisplay();
	}

	/* inputHistory의 마지막 요소 변경
    - 마지막 요소를 제거한 후
    - 새로운 요소 추가
  */
	editLastInput(value, type) {
		this.inputHistory.pop();
		this.addNewInput(value, type);
	}

	// inputHistoy의 마지막 요소 제거
	deleteLastInput() {
		this.inputHistory.pop();
		this.updateInputDisplay();
	}

	// inputDisplay 안에 inputHistory의 value만 보이게
	updateInputDisplay() {
		this.inputDisplay.value = this.getAllInputValues().join('');
	}

	// outputDisplay 안에 전달받은 값을 현지화하여 나타냄
	updateOutputDisplay(value) {
		this.outputDisplay.value = Number(value).toLocaleString();
	}

	// 좌항과 우항, 연산자의 값을 받아 연산을 실행함
	performOperation(leftOperand, operator, rightOperand) {
		leftOperand = parseFloat(leftOperand);
		rightOperand = parseFloat(rightOperand);

		if (isNaN(leftOperand) || isNaN(rightOperand)) return;

		switch (operator) {
			case '*':
				return leftOperand * rightOperand;
			case '/':
				return leftOperand / rightOperand;
			case '+':
				return leftOperand + rightOperand;
			case '-':
				return leftOperand - rightOperand;
			default:
				return;
		}
	}
}

// DOM
const inputDisplay = document.querySelector('.history');
const outputDisplay = document.querySelector('.result');

const clearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const percentButton = document.querySelector('[data-percent]');
const operationButtons = document.querySelectorAll('[data-operator]');
const numberButtons = document.querySelectorAll('[data-number]');
const negationButton = document.querySelector('[data-negation]');
const decimalButton = document.querySelector('[data-decimal]');
const equalsButton = document.querySelector('[data-equals]');

// Calculator 객체 생성
const calculator = new Calculator(inputDisplay, outputDisplay);

// 버튼 이벤트
clearButton.addEventListener('click', () => {
	calculator.clear();
});

deleteButton.addEventListener('click', () => {
	calculator.delete();
});

percentButton.addEventListener('click', () => {
	calculator.changePersentToDecimal();
});

operationButtons.forEach((button) => {
	button.addEventListener('click', (event) => {
		let { target } = event;
		calculator.insertOperation(target.dataset.operator);
	});
});

numberButtons.forEach((button) => {
	button.addEventListener('click', (event) => {
		let { target } = event;
		calculator.insertNumber(target.dataset.number);
	});
});

negationButton.addEventListener('click', () => {
	calculator.negateNumber();
});

decimalButton.addEventListener('click', () => {
	calculator.insertDecimalPoint();
});

equalsButton.addEventListener('click', () => {
	calculator.generateResult();
});
