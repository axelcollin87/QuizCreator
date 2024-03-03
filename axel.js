const questionsContainer = document.getElementById("questions-container");
const addQuestion = document.getElementById("add-question");
const saveQuiz = document.getElementById("save-quiz");

let questionsArr = [];
let qNumber = 1;

addQuestion.addEventListener("click", () => {
    const html = `
        <div class="content-container" id="content-container-${qNumber}">
            <label class="remove" id="remove${qNumber}">X</label>
            <label for="quiz-question-${qNumber}">Type your question here:</label>
            <br />
            <input type="text" id="quiz-question-${qNumber}" name="quiz-question-${qNumber}" />
            <br />
            <label>Select question type:</label>
            <br />
            <input value="text" name="${qNumber}" type="radio" />
            <label for="text">Text question</label>
            <br />
            <input value="radio" name="${qNumber}" type="radio" />
            <label for="radio">Radio question</label>
            <br />
            <input value="check" name="${qNumber}" type="radio" />
            <label for="check">Checkbox question</label>
            <br />
            <div id="answer-container-${qNumber}"></div>
        </div>
        `;
    questionsArr.push(qNumber);
    qNumber += 1;
    saveQuiz.disabled = false;
    questionsContainer.insertAdjacentHTML("beforeend", html);
});

questionsContainer.addEventListener("click", (event) => {
    if (event.target.type === "radio") {
        const targetQuestion = document.getElementById(
            `answer-container-${event.target.name}`
        );
        switch (event.target.value) {
            case "text":
                targetQuestion.innerHTML = `
                <label>Answer:</label>
                <br />
                <input id="answer${event.target.name}" type="text" />`;
                break;
            case "radio":
                targetQuestion.innerHTML = `
                <div name id='alternative-container-${event.target.name}'>
                    <label>Alternative:</label>
                    <br />
                    <div id='alternative'>
                        <input id="alternative${event.target.name}" type="text" data-linked-radio="radio1" />
                        <input id="radio1" name="alternative${event.target.name}" type="radio" />
                        <label>Answer</label>
                        <br />
                    </div>
                    <label>Alternative:</label>
                    <br />
                    <div id='alternative'>
                        <input id="alternative${event.target.name}" type="text" data-linked-radio="radio1"/>
                        <input id="radio2" name="alternative${event.target.name}" type="radio" />
                        <label>Answer</label>
                        <br />
                    </div>
                </div>
                <button id="add-radio-${event.target.name}">Add alternative</button>`;
                break;
            case "check":
                targetQuestion.innerHTML = `
                <div name id='alternative-container-${event.target.name}'>
                    <label>Alternative:</label>
                    <br />
                    <div id='alternative'>
                        <input type="text" />
                        <input name="alternative${event.target.name}" type="checkbox" />
                        <label>Answer</label>
                        <br />
                    </div>
                    <label>Alternative:</label>
                    <br />
                    <div id='alternative'>
                        <input type="text" />
                        <input name="alternative${event.target.name}" type="checkbox" />
                        <label>Answer</label>
                        <br />
                    </div>
                </div>
                <button id="add-checkbox-${event.target.name}">Add alternative</button>
                `;
                break;
        }
    } else if (event.target.id.startsWith("add-radio-")) {
        let radioId = event.target.id.charAt(event.target.id.length - 1);
        console.log(radioId);

        const alternatives = document.querySelectorAll(
            `input[name="alternative${radioId}"]`
        );

        console.log(alternatives);

        const numberOfAlternatives = alternatives.length;

        console.log(numberOfAlternatives);

        const targetDiv = document.getElementById(
            `alternative-container-${radioId}`
        );

        let html = `
            <label>Alternative:</label>
            <div id='alternative'>
                <input id="alternative${radioId}" type="text" data-linked-radio="radio${
            numberOfAlternatives + 1
        }" />
                <input id="radio${
                    numberOfAlternatives + 1
                }" name="alternative${radioId}" type="radio" />
                <label>Answer</label>
                <br />
            </div>
        `;

        targetDiv.insertAdjacentHTML("beforeend", html);
    } else if (event.target.id.startsWith("add-checkbox-")) {
        let checkId = event.target.id.charAt(event.target.id.length - 1);
        console.log(checkId);

        const targetDiv = document.getElementById(
            `alternative-container-${checkId}`
        );

        let html = `
            <label>Alternative:</label>
            <div id='alternative'>
                <input type="text" />
                <input name="alternative${checkId}" type="checkbox" />
                <label>Answer</label>
                <br />
            </div>
        `;
        targetDiv.insertAdjacentHTML("beforeend", html);
    } else if (event.target.id.startsWith("remove")) {
        const targetId = event.target.id.charAt(event.target.id.length - 1);
        const removeTarget = document.getElementById(
            `content-container-${targetId}`
        );
        removeTarget.parentNode.removeChild(removeTarget);
        questionsArr.splice(questionsArr.indexOf(targetId), 1);
        toggleSaveButton();
    }
});

function toggleSaveButton() {
    if (questionsArr.length > 0) {
        saveQuiz.disabled = false;
    } else {
        saveQuiz.disabled = true;
    }
}

saveQuiz.addEventListener("click", () => {
    questionsArr.forEach((question) => {
        // Fråga:
        console.log(document.getElementById(`quiz-question-${question}`).value);

        const checkedRadio = document.querySelector(
            `input[name='${question}']:checked`
        );

        switch (checkedRadio.value) {
            case "text":
                console.log(document.getElementById(`answer${question}`).value);
                break;
            case "radio":
                console.log("radio");
                break;
            case "check":
                console.log("check");
                break;
        }
    });
});
