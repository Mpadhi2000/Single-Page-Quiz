document.addEventListener('DOMContentLoaded', function() {
    // Quiz data
    const questions = [
        {
            id: 1,
            question: "When call volumes spike unexpectedly, your first instinct is to:",
            options: [
                {
                    value: "A",
                    text: "Rally your team for a quick huddle, brainstorming immediate and creative solutions together.",
                },
                {
                    value: "B",
                    text: "Focus on how this surge impacts the customer experience—and quickly adapt communication scripts or channel availability.",
                },
                {
                    value: "C",
                    text: "Pull up historical data and real‐time dashboards to forecast the best staffing adjustments.",
                },
                { value: "D", text: "Look for new technology or automation that can scale quickly and handle the extra volume." },
            ],
        },
        {
            id: 2,
            question: "You measure success in your contact center primarily by:",
            options: [
                {
                    value: "A",
                    text: "Team synergy and cross‐functional collaboration leading to consistent performance improvements.",
                },
                {
                    value: "B",
                    text: "Satisfaction metrics like CSAT and NPS, ensuring customers get the best experience possible.",
                },
                {
                    value: "C",
                    text: "Key performance data—like FCR, AHT, and conversion rates—tracked against clear benchmarks.",
                },
                {
                    value: "D",
                    text: "The successful integration of cutting‐edge tools and the pace of innovation in daily operations.",
                },
            ],
        },
        {
            id: 3,
            question: "A new agent comes on board. You'd like them to ramp up quickly. How do you ensure a smooth onboarding?",
            options: [
                { value: "A", text: "Pair them with experienced agents for peer coaching and real‐time feedback." },
                {
                    value: "B",
                    text: "Provide them with customer scenarios and empathy training so they fully grasp the customer's perspective.",
                },
                {
                    value: "C",
                    text: "Give them access to a data library and analytics insights on call types so they can understand patterns from day one.",
                },
                {
                    value: "D",
                    text: "Offer them a curated tech stack overview and hands‐on experience with the latest AI/automation tools.",
                },
            ],
        },
        {
            id: 4,
            question: "When launching a major initiative, your priority is to:",
            options: [
                {
                    value: "A",
                    text: "Align stakeholders from different departments, ensuring cross‐team buy‐in for new initiatives.",
                },
                { value: "B", text: "Deepen the customer journey—possibly adding new touchpoints or personalization measures." },
                {
                    value: "C",
                    text: "Improve key metrics systematically by analyzing performance gaps and creating data‐driven action plans.",
                },
                {
                    value: "D",
                    text: "Introduce or enhance technology solutions (e.g., AI, workflow automation) to accelerate efficiency.",
                },
            ],
        },
        {
            id: 5,
            question: "When planning next quarter's goals, your top priority is to:",
            options: [
                {
                    value: "A",
                    text: "Align stakeholders from different departments, ensuring cross‐team buy‐in for new initiatives.",
                },
                { value: "B", text: "Deepen the customer journey—possibly adding new touchpoints or personalization measures." },
                {
                    value: "C",
                    text: "Improve key metrics systematically by analyzing performance gaps and creating data‐driven action plans.",
                },
                {
                    value: "D",
                    text: "Introduce or enhance technology solutions (e.g., AI, workflow automation) to accelerate efficiency.",
                },
            ],
        },
    ];

    // Personality types
    const personalityTypes = {
        A: {
            emoji: "🤝",
            title: "Collaborative Innovator",
            description:
                "You thrive on synergy, creativity, and building better together. Your approach centers on team collaboration and cross-functional partnerships to drive innovation and solve complex problems. You excel at bringing diverse perspectives together to create holistic solutions.",
        },
        B: {
            emoji: "📊",
            title: "Customer-Centric Strategist",
            description:
                "You obsess over customer experience and drive innovation from feedback. Your decisions are guided by deep customer insights, and you're constantly looking for ways to enhance satisfaction and loyalty through personalized experiences and journey optimization.",
        },
        C: {
            emoji: "🧠",
            title: "Data-Driven Visionary",
            description:
                "You lead with insight and structure, turning numbers into strategic clarity. Your analytical mindset helps you identify patterns and opportunities others might miss, and you excel at using metrics to guide decision-making and drive continuous improvement.",
        },
        D: {
            emoji: "⚙️",
            title: "Tech-Savvy Trailblazer",
            description:
                "You're always on the lookout for the next breakthrough and know how to scale it fast. You have a natural affinity for emerging technologies and automation, and you're skilled at identifying and implementing solutions that drive efficiency and innovation.",
        },
    };

    // DOM Elements
    const landingPage = document.getElementById('landing-page');
    const quizPage = document.getElementById('quiz-page');
    const resultsPage = document.getElementById('results-page');
    const emailForm = document.getElementById('email-form');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const questionNumber = document.getElementById('question-number');
    const progressPercentage = document.getElementById('progress-percentage');
    const progressIndicator = document.getElementById('progress-indicator');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const nextBtn = document.getElementById('next-btn');
    const personalityEmoji = document.getElementById('personality-emoji');
    const personalityTitle = document.getElementById('personality-title');
    const personalityDescription = document.getElementById('personality-description');
    const shareBtn = document.getElementById('share-btn');
    const retakeBtn = document.getElementById('retake-btn');
    const exploreBtn = document.getElementById('explore-btn');
    const thankYouMessage = document.getElementById('thank-you-message');

    // State variables
    let currentQuestion = 0;
    let answers = {};
    let selectedOption = null;
    let userEmail = '';

    // Initialize the quiz
    function init() {
        // Check if there's a saved state
        const savedEmail = localStorage.getItem('quiz_user_email');
        const savedAnswers = localStorage.getItem('quiz_answers');
        
        if (savedEmail && savedAnswers) {
            userEmail = savedEmail;
            answers = JSON.parse(savedAnswers);
            
            // If all questions are answered, show results
            if (Object.keys(answers).length === questions.length) {
                showResults();
            } else {
                // Find the next unanswered question
                for (let i = 0; i < questions.length; i++) {
                    if (!answers.hasOwnProperty(i)) {
                        currentQuestion = i;
                        break;
                    }
                }
                showQuiz();
            }
        }
        
        // Set up event listeners
        emailForm.addEventListener('submit', handleEmailSubmit);
        nextBtn.addEventListener('click', handleNextQuestion);
        shareBtn.addEventListener('click', handleShareResult);
        retakeBtn.addEventListener('click', handleRetakeQuiz);
        exploreBtn.addEventListener('click', function() {
            window.open('https://example.com/solutions', '_blank');
        });
    }

    // Handle email form submission
    function handleEmailSubmit(e) {
        e.preventDefault();
        emailError.style.display = 'none';
        
        const email = emailInput.value.trim();
        
        if (!email) {
            showError('Please enter your email address');
            return;
        }
        
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            showError('Please enter a valid email address');
            return;
        }
        
        // Save email and reset answers
        userEmail = email;
        localStorage.setItem('quiz_user_email', email);
        localStorage.removeItem('quiz_answers');
        answers = {};
        
        // Show quiz
        showQuiz();
    }

    // Show error message
    function showError(message) {
        emailError.textContent = message;
        emailError.style.display = 'block';
    }

    // Show quiz page
    function showQuiz() {
        landingPage.classList.remove('active');
        quizPage.classList.add('active');
        resultsPage.classList.remove('active');
        
        loadQuestion();
    }

    // Load current question
    function loadQuestion() {
        const question = questions[currentQuestion];
        
        // Update progress
        const progress = ((currentQuestion + 1) / questions.length) * 100;
        questionNumber.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
        progressPercentage.textContent = `${Math.round(progress)}%`;
        progressIndicator.style.width = `${progress}%`;
        
        // Set question text
        questionText.textContent = question.question;
        
        // Clear options
        optionsContainer.innerHTML = '';
        
        // Add options
        question.options.forEach(option => {
            const optionItem = document.createElement('div');
            optionItem.className = 'option-item';
            optionItem.dataset.value = option.value;
            
            // Check if this option was previously selected
            if (answers[currentQuestion] === option.value) {
                optionItem.classList.add('selected');
                selectedOption = option.value;
                nextBtn.disabled = false;
            }
            
            optionItem.innerHTML = `
                <input type="radio" name="quiz-option" id="option-${option.value}" class="option-radio" value="${option.value}" ${answers[currentQuestion] === option.value ? 'checked' : ''}>
                <label for="option-${option.value}" class="option-label">${option.text}</label>
            `;
            
            optionItem.addEventListener('click', function() {
                selectOption(option.value);
            });
            
            optionsContainer.appendChild(optionItem);
        });
        
        // Update next button text
        nextBtn.textContent = currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results';
    }

    // Select an option
    function selectOption(value) {
        // Clear previous selection
        const options = document.querySelectorAll('.option-item');
        options.forEach(option => {
            option.classList.remove('selected');
            const radio = option.querySelector('input[type="radio"]');
            radio.checked = false;
        });
        
        // Set new selection
        const selectedItem = document.querySelector(`.option-item[data-value="${value}"]`);
        if (selectedItem) {
            selectedItem.classList.add('selected');
            const radio = selectedItem.querySelector('input[type="radio"]');
            radio.checked = true;
        }
        
        selectedOption = value;
        nextBtn.disabled = false;
    }

    // Handle next question button
    function handleNextQuestion() {
        if (selectedOption) {
            // Save answer
            answers[currentQuestion] = selectedOption;
            localStorage.setItem('quiz_answers', JSON.stringify(answers));
            
            // Reset selection
            selectedOption = null;
            nextBtn.disabled = true;
            
            // Move to next question or results
            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                loadQuestion();
            } else {
                showResults();
            }
        }
    }

    // Show results page
    function showResults() {
        // Calculate results
        const answerCounts = { A: 0, B: 0, C: 0, D: 0 };
        
        Object.values(answers).forEach(answer => {
            if (answerCounts.hasOwnProperty(answer)) {
                answerCounts[answer]++;
            }
        });
        
        // Find most frequent answer
        let maxCount = 0;
        let maxAnswer = 'A';
        
        Object.entries(answerCounts).forEach(([answer, count]) => {
            if (count > maxCount) {
                maxCount = count;
                maxAnswer = answer;
            }
        });
        
        // Get personality type
        const personality = personalityTypes[maxAnswer];
        
        // Update results page
        personalityEmoji.textContent = personality.emoji;
        personalityTitle.textContent = personality.title;
        personalityDescription.textContent = personality.description;
        thankYouMessage.textContent = `Thank you for taking our leadership style quiz, ${userEmail}! We hope these insights help you leverage your unique strengths.`;
        
        // Show results page
        landingPage.classList.remove('active');
        quizPage.classList.remove('active');
        resultsPage.classList.add('active');
    }

    // Handle share result button
    function handleShareResult() {
        const personality = personalityTypes[getPersonalityType()];
        
        if (navigator.share) {
            navigator.share({
                title: `My Leadership Style: ${personality.emoji} ${personality.title}`,
                text: `I just discovered my contact center leadership style: ${personality.emoji} ${personality.title}. Take the quiz to find yours!`,
                url: window.location.href,
            }).catch(err => {
                console.error('Error sharing:', err);
                alert('Could not share the result. Try copying the link manually.');
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            alert('Share functionality not supported in your browser. Try copying the link manually.');
        }
    }

    // Get personality type from answers
    function getPersonalityType() {
        const answerCounts = { A: 0, B: 0, C: 0, D: 0 };
        
        Object.values(answers).forEach(answer => {
            if (answerCounts.hasOwnProperty(answer)) {
                answerCounts[answer]++;
            }
        });
        
        let maxCount = 0;
        let maxAnswer = 'A';
        
        Object.entries(answerCounts).forEach(([answer, count]) => {
            if (count > maxCount) {
                maxCount = count;
                maxAnswer = answer;
            }
        });
        
        return maxAnswer;
    }

    // Handle retake quiz button
    function handleRetakeQuiz() {
        // Clear answers but keep email
        localStorage.removeItem('quiz_answers');
        answers = {};
        currentQuestion = 0;
        selectedOption = null;
        
        // Show quiz
        showQuiz();
    }

    // Initialize the quiz
    init();
});