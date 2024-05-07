const express = require('express'); // 익스프레스 모듈
const bodyParser = require('body-parser'); // 바디파서 모듈
const OpenAI = require('openai'); // openai 모듈 사용
require('dotenv').config(); // 키 암호화용 모듈

const app = express(); // 익스프레스 애플리케이션 생성
const port = 3000; // 서버 포트

const openai = new OpenAI({ // OpenAI 클라이언트 생성
    apiKey: process.env.OPENAI_API_KEY, // OpenAI API 키
});

// 정적 파일 제공을 위한 미들웨어 등록
//app.use(express.static('public'));

// JSON 파싱을 위한 미들웨어 등록
app.use(bodyParser.json());

// 메인 페이지 라우트 설정
app.get('/', (req, res) => {
    // 클라이언트에게 index.html 파일 전송
    res.sendFile(__dirname + '/index.html'); // /public추가시 파일경로안에있는 index.html로 들어가짐
});

// POST /generate-image 엔드포인트 생성
app.post('/generate-image', async (req, res) => {
    try {
        const promptText = req.body.prompt; // 클라이언트에서 전송된 텍스트 프롬프트 가져오기

        // DALL·E 모델을 사용하여 이미지 생성 요청
        const response = await openai.images.generate({
            model: "dall-e-3", // 모델 선택
            prompt: promptText, // 사용자 입력 프롬프트
            n: 1, // 생성할 이미지 개수
            size: "1024x1024", // 이미지 크기
        });

        const imageUrl = response.data[0].url; // 생성된 이미지 URL 추출

        // 클라이언트에게 이미지 URL 응답
        res.json({ imageUrl });
    } catch (error) {
        console.error('Error generating image:', error.message);
        // 오류 응답 전송
        res.status(500).json({ error: 'Failed to generate image' });
    }
});

// 서버 시작
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
