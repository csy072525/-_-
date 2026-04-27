// 네비게이션 처리
function navigate(sectionId) {
    // 모든 섹션 숨기기
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    // 모든 버튼 비활성화
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // 선택된 섹션 보이기
    document.getElementById(sectionId).classList.add('active');
    // 선택된 버튼 활성화
    document.getElementById(`nav-${sectionId}`).classList.add('active');
}

// ---------------- 이야기 메뉴 ----------------

const stories = {
    'kongji': {
        title: '콩쥐팥쥐',
        content: `
            <p>옛날 옛적에 마음씨 착한 콩쥐와 마음씨 고약한 팥쥐가 살았어요.</p>
            <p>새어머니와 팥쥐는 매일 콩쥐에게만 힘든 일을 시켰답니다. 나무도 베어오게 하고, 밑 빠진 독에 물도 채우게 했어요.</p>
            <p>하지만 콩쥐는 슬퍼하지 않았어요. 왜냐하면 동물 친구들이 콩쥐를 도와주었거든요!</p>
            <p>두꺼비가 나타나 밑 빠진 독을 막아주고, 참새들이 날아와 벼의 껍질을 까주었지요. 검은 소는 잔칫집에 갈 수 있게 예쁜 옷과 신발을 선물해주었어요.</p>
            <p>잔칫집에 가다가 콩쥐는 그만 신발 한 짝을 물에 빠뜨리고 말았어요. 그런데 지나가던 원님이 그 신발을 줍게 되었답니다.</p>
            <p>"이 예쁜 신발의 주인을 찾아라!"</p>
            <p>원님은 신발의 주인을 찾았고, 신발에 발이 쏙 맞는 콩쥐를 만나게 되었어요. 착한 콩쥐는 원님과 결혼해서 오래오래 행복하게 살았답니다!</p>
        `
    },
    'prince': {
        title: '어린왕자',
        content: `
            <p>사막 한가운데 비행기가 고장 나서 떨어졌어요. 조종사는 거기서 아주 작고 귀여운 소년을 만났답니다. 바로 '어린 왕자'였어요.</p>
            <p>"양 한 마리만 그려줘." 어린 왕자가 말했어요.</p>
            <p>어린 왕자는 B612라는 아주아주 작은 별에서 왔어요. 그 별에는 어린 왕자가 사랑하는 장미꽃이 한 송이 있었지요.</p>
            <p>어린 왕자는 여러 별들을 여행하면서 이상한 어른들을 많이 만났어요. 명령만 하는 왕, 칭찬만 듣고 싶어 하는 사람, 별을 세기만 하는 상인...</p>
            <p>지구에 와서는 여우를 만났어요. 여우는 어린 왕자에게 아주 중요한 비밀을 알려주었어요.</p>
            <p><strong>"가장 중요한 것은 눈에 보이지 않아. 마음으로 보아야 해."</strong></p>
            <p>어린 왕자는 자기가 남겨두고 온 장미꽃이 세상에서 가장 특별하다는 것을 깨달았어요. 그리고 장미꽃을 돌보기 위해 다시 자기의 별로 돌아갔답니다.</p>
        `
    }
};

function openStory(storyId) {
    document.getElementById('story-list').classList.add('hidden');
    document.getElementById('story-reader').classList.remove('hidden');
    
    const story = stories[storyId];
    document.getElementById('story-title').innerText = story.title;
    document.getElementById('story-content').innerHTML = story.content;
}

function closeStory() {
    document.getElementById('story-reader').classList.add('hidden');
    document.getElementById('story-list').classList.remove('hidden');
}

// ---------------- 챗봇 메뉴 ----------------

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function fillChat(text) {
    document.getElementById('chat-input').value = text;
    sendMessage();
}

function appendMessage(text, className) {
    const chatBox = document.getElementById('chat-box');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${className}`;
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
    const inputField = document.getElementById('chat-input');
    const userText = inputField.value.trim();
    
    if (userText === '') return;

    // 사용자 메시지 추가
    appendMessage(userText, 'user-message');
    inputField.value = '';

    // 간단한 챗봇 응답 로직
    setTimeout(() => {
        let botResponse = getBotResponse(userText);
        appendMessage(botResponse, 'bot-message');
    }, 500);
}

function getBotResponse(text) {
    const t = text.replace(/ /g, ''); // 공백 제거하여 검색
    
    if (t.includes('안녕') || t.includes('반가워') || t.includes('인사')) {
        return "안녕! 나는 도서관 친구 챗봇이야. 만나서 반가워!😊";
    } else if (t.includes('시간') || t.includes('몇시') || t.includes('언제')) {
        return "우리 학교 도서관은 매일 아침 9시부터 오후 4시 30분까지 열려있어! 쉬는 시간과 점심시간에 놀러와~ ⏰";
    } else if (t.includes('추천') || t.includes('재미있는책') || t.includes('볼만한책')) {
        return "음~ 오늘은 '마법천자문'이나 '해리포터'를 읽어보는 건 어때? 모험 이야기가 아주 재미있을 거야! 📚";
    } else if (t.includes('게임') || t.includes('놀이')) {
        return "위 메뉴에서 'KDC 게임'을 눌러봐! 책의 번호를 맞추는 재미있는 게임이 준비되어 있어. 🎮";
    } else if (t.includes('KDC') || t.includes('십진분류')) {
        return "KDC는 '한국십진분류법'이라는 거야! 책들을 비슷한 주제끼리 000번부터 900번까지 번호를 붙여서 모아둔 거란다. 📖";
    } else if (t.includes('바보') || t.includes('멍청이')) {
        return "예쁜 말을 사용해주세요! 도서관에서는 서로 배려하는 마음이 필요해요. 🥺";
    } else {
        return "앗, 그건 아직 내가 모르는 말이야. 도서관 사서 선생님께 여쭤보는 건 어떨까? 🧐";
    }
}

// ---------------- 게임 메뉴 ----------------

const kdcQuestions = [
    { question: "강아지, 고양이 같은 '동물'이나 예쁜 '꽃'에 대한 책은 몇 번일까요?", answer: "400 (자연과학)", options: ["400 (자연과학)", "800 (문학)", "900 (역사)"] },
    { question: "재미있는 동화책, 시집, 소설책은 몇 번 책장에 있을까요?", answer: "800 (문학)", options: ["300 (사회과학)", "800 (문학)", "500 (기술과학)"] },
    { question: "옛날 옛적 세종대왕님이나 이순신 장군님 이야기를 다룬 '역사' 책은?", answer: "900 (역사)", options: ["100 (철학)", "700 (언어)", "900 (역사)"] },
    { question: "컴퓨터, 스마트폰, 로봇을 만드는 방법에 대한 책은?", answer: "500 (기술과학)", options: ["500 (기술과학)", "200 (종교)", "600 (예술)"] },
    { question: "피아노 치는 법이나 그림 그리는 법을 알려주는 '예술' 책은?", answer: "600 (예술)", options: ["000 (총류)", "400 (자연과학)", "600 (예술)"] }
];

let currentQuestionIndex = 0;
let score = 0;

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    updateScore();
    document.querySelector('.game-start-btn').innerText = "게임 다시하기";
    showQuestion();
}

function showQuestion() {
    const q = kdcQuestions[currentQuestionIndex];
    document.getElementById('game-question').innerText = `Q${currentQuestionIndex + 1}. ${q.question}`;
    
    const optionsContainer = document.getElementById('game-options');
    optionsContainer.innerHTML = '';
    
    // 선택지 섞기
    let shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
    
    shuffledOptions.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'game-option-btn';
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(opt);
        optionsContainer.appendChild(btn);
    });

    document.getElementById('game-feedback').className = 'game-feedback hidden';
}

function checkAnswer(selectedOption) {
    const q = kdcQuestions[currentQuestionIndex];
    const feedbackEl = document.getElementById('game-feedback');
    
    // 버튼 비활성화 (중복 클릭 방지)
    document.querySelectorAll('.game-option-btn').forEach(btn => btn.disabled = true);
    
    feedbackEl.classList.remove('hidden');
    
    if (selectedOption === q.answer) {
        feedbackEl.innerText = "🎉 딩동댕! 정답이에요! 🎉";
        feedbackEl.className = 'game-feedback feedback-correct';
        score += 20;
        updateScore();
    } else {
        feedbackEl.innerText = `앗, 틀렸어요. 정답은 '${q.answer}' 랍니다. 😢`;
        feedbackEl.className = 'game-feedback feedback-wrong';
    }
    
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < kdcQuestions.length) {
            showQuestion();
        } else {
            endGame();
        }
    }, 2000);
}

function updateScore() {
    document.getElementById('score').innerText = score;
}

function endGame() {
    document.getElementById('game-question').innerHTML = `
        게임 끝!<br>
        나의 점수는 <strong>${score}점</strong> 입니다!<br>
        ${score === 100 ? "대단해요! 도서관 박사님이네요!" : "다음에 다시 도전해봐요!"}
    `;
    document.getElementById('game-options').innerHTML = '';
    document.getElementById('game-feedback').classList.add('hidden');
}
