const express = require('express');
const router = express.Router();

// POST /push-mobile/v2/push
router.post('/v2/push', (req, res) => {
    const appName = req.query.appName;
    const apiKey = req.headers['apikey'];
    const body = req.body;

    // 简单API Key校验
    if (!apiKey || apiKey.length < 10) {
        return res.status(400).json({
            code: "INVALID_REQUEST",
            message: "Missing or invalid apiKey"
        });
    }

    // 参数校验
    if (!appName) {
        return res.status(400).json({
            code: "INVALID_REQUEST",
            message: "Missing appName in query"
        });
    }
    if (!body || typeof body !== 'object') {
        return res.status(400).json({
            code: "INVALID_REQUEST",
            message: "Missing request body"
        });
    }
    const { title, message, deviceIds, topic } = body;
    if (!title || !message) {
        return res.status(400).json({
            code: "INVALID_REQUEST",
            message: "Missing title or message"
        });
    }
    if ((!deviceIds || !Array.isArray(deviceIds) || deviceIds.length === 0) && (!topic || topic === "")) {
        return res.status(400).json({
            code: "INVALID_REQUEST",
            message: "Either topic or deviceIds must be provided"
        });
    }

    // 模拟推送逻辑
    let results = [];
    let success = 0, fail = 0;
    if (deviceIds && Array.isArray(deviceIds)) {
        deviceIds.forEach((id, idx) => {
            results.push({
                messageId: `msg${1000 + idx}`,
                registrationId: id
            });
            success++;
        });
    }

    const response = {
        success,
        fail,
        results
    };
    console.log('Push Response:', JSON.stringify(response, null, 2));
    return res.status(200).json(response);
});

module.exports = router;
