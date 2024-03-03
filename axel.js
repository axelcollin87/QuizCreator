const questionsContainer = document.getElementById("questions-container");
const addQuestion = document.getElementById("add-question");
const saveQuiz = document.getElementById("save-quiz");
const loadQuiz = document.getElementById("load-quiz");
const submitQuiz = document.getElementById("submit-quiz");
let questionsArr = [];
let qNumber = 1;
localStorage.clear();

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
    console.log(qNumber);
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
                        <input id="alternative${event.target.name}" type="text" data-linked-radio="radio2"/>
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
                        <input id="alternative${event.target.name}" type="text" data-linked-checkbox="checkbox1" />
                        <input id="checkbox1" name="alternative${event.target.name}" type="checkbox" />
                        <label>Answer</label>
                        <br />
                    </div>
                    <label>Alternative:</label>
                    <br />
                    <div id='alternative'>
                        <input id="alternative${event.target.name}" type="text" data-linked-checkbox="checkbox2" />
                        <input id="checkbox2" name="alternative${event.target.name}" type="checkbox" />
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
            `input[id="alternative${radioId}"]`
        );

        alternatives.forEach((ele) => console.log(ele.value));

        const numberOfAlternatives = alternatives.length;

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

        const alternatives = document.querySelectorAll(
            `input[id="alternative${checkId}"]`
        );

        const numberOfAlternatives = alternatives.length;

        const targetDiv = document.getElementById(
            `alternative-container-${checkId}`
        );

        let html = `
            <label>Alternative:</label>
            <div id='alternative'>
                <input id="alternative${checkId}" type="text" data-linked-checkbox="checkbox${
            numberOfAlternatives + 1
        }" />
                <input id="checkbox${
                    numberOfAlternatives + 1
                }" name="alternative${checkId}" type="checkbox" />
                <label>Answer</label>
                <br />
            </div>
        `;
        targetDiv.insertAdjacentHTML("beforeend", html);
    } else if (event.target.id.startsWith("remove")) {
        const targetId = parseInt(
            event.target.id.charAt(event.target.id.length - 1)
        );
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
    localStorage.clear();
    console.log(questionsArr);
    // For each question, check type and then collect data depending on the type
    questionsArr.forEach((question) => {
        let questionObject = {
            id: question,
            question: document.getElementById(`quiz-question-${question}`)
                .value,
        };

        const checkedRadio = document.querySelector(
            `input[name='${question}']:checked`
        );

        const alternatives = document.querySelectorAll(
            `input[id="alternative${question}"]`
        );

        switch (checkedRadio.value) {
            case "text":
                questionObject.type = "text";
                questionObject.answer = document.getElementById(
                    `answer${question}`
                ).value;
                break;
            case "radio":
                questionObject.type = "radio";

                questionObject.options = [];

                alternatives.forEach((ele) =>
                    questionObject.options.push(ele.value)
                );

                const checkedAnswerRadio = document.querySelector(
                    `input[name="alternative${question}"]:checked`
                );

                const answerInput = document.querySelector(
                    `input[data-linked-radio="${checkedAnswerRadio.id}"]`
                );

                questionObject.answer = answerInput.value;

                break;
            case "check":
                questionObject.type = "checkbox";

                questionObject.options = [];

                alternatives.forEach((ele) =>
                    questionObject.options.push(ele.value)
                );

                const checkedBoxes = document.querySelectorAll(
                    `input[name="alternative${question}"]:checked`
                );

                questionObject.answer = [];

                checkedBoxes.forEach((cb) => {
                    const linkedInput = document.querySelector(
                        `input[data-linked-checkbox="${cb.id}"]`
                    );

                    if (linkedInput) {
                        // Log the value of the linked text input
                        questionObject.answer.push(linkedInput.value);
                    }
                });
                break;
        }
        saveQuizLocaly(questionObject);
        document.getElementById(`content-container-${question}`).innerHTML = "";
        document.getElementById(`content-container-${question}`).style.padding =
            "0";
        document.getElementById(`content-container-${question}`).style.margin =
            "0";
        saveQuiz.style.display = "none";
        addQuestion.style.display = "none";
        loadQuiz.style.display = "inline";
    });
});

function saveQuizLocaly(questionObject) {
    let existingQuestions = localStorage.getItem("questions");
    let questions = [];

    if (existingQuestions) {
        questions = JSON.parse(existingQuestions);
    }
    questions.push(questionObject);
    console.log(questions);
    localStorage.setItem("questions", JSON.stringify(questions));
}

loadQuiz.addEventListener("click", () => {
    let storedQuestions = localStorage.getItem("questions");
    let questionCount = 1;
    let questions = JSON.parse(storedQuestions);

    questions.forEach((q) => {
        // Start of the question div

        let questionHtml = `<div class="question" id="q${q.id}">`;

        switch (q.type) {
            case "text":
                questionHtml += `<p class="questionP">${questionCount}. ${q.question}</p>`;
                questionHtml += `<input type='text' name='${q.id}' placeholder='Type answer here (required) '/>`;
                questionHtml += `<p class="input-error" id='${q.id}'></p>`;
                questionCount += 1;
                break;
            case "radio":
                questionHtml += `<p class="questionP">${questionCount}. ${q.question}</p>`;
                q.options.forEach((option) => {
                    questionHtml += `<input type='radio' name='${q.id}' value='${option}'/>`;
                    questionHtml += `<label for='${option}'>${option}</label>`;
                    questionHtml += `<br />`;
                });
                questionHtml += `<p class="input-error" id='${q.id}'></p>`;
                questionCount += 1;
                break;
            case "checkbox":
                questionHtml += `<p class="questionP">${questionCount}. ${q.question} (Multi choice)</p>`;
                q.options.forEach((option) => {
                    questionHtml += `<input type='checkbox' name='${q.id}' value='${option}'/>`;
                    questionHtml += `<label for='${option}'>${option}</label>`;
                    questionHtml += `<br />`;
                });
                questionHtml += `<p class="input-error" id='${q.id}'></p>`;
                questionCount += 1;
                break;
        }

        // End of the question div
        questionHtml += `</div>`;

        // Append the entire question div to the container
        questionsContainer.innerHTML += questionHtml;
        loadQuiz.style.display = "none";
        submitQuiz.style.display = "flex";
    });
});

submitQuiz.addEventListener("click", () => {
    alert("Congratulations on completing the quiz!");
});
