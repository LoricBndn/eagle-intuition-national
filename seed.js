"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var newsletterEmails, imageUrls, images, coursesData, erasmusImageIds, erasmusTitles, erasmusCoursesData, erasmusProjectData, postsData, posts, videosData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newsletterEmails = [
                        'user1@example.com', 'user2@example.com', 'user3@example.com', 'user4@example.com',
                        'user5@example.com', 'user6@example.com', 'user7@example.com', 'user8@example.com',
                        'user9@example.com', 'user10@example.com', 'user11@example.com', 'user12@example.com',
                        'user13@example.com', 'user14@example.com', 'user15@example.com', 'user16@example.com',
                        'user17@example.com', 'user18@example.com', 'user19@example.com', 'user20@example.com',
                        'user21@example.com',
                    ];
                    return [4 /*yield*/, Promise.all(newsletterEmails.map(function (email) {
                            return prisma.newsletter.create({
                                data: { email: email, createdAt: new Date() },
                            });
                        }))];
                case 1:
                    _a.sent();
                    imageUrls = Array.from({ length: 21 }, function (_, i) { return "https://cdn.example.com/images/".concat(i + 1, ".jpg"); });
                    return [4 /*yield*/, Promise.all(imageUrls.map(function (url) {
                            return prisma.image.create({ data: { url: url } });
                        }))];
                case 2:
                    images = _a.sent();
                    coursesData = Array.from({ length: 20 }, function (_, i) { return ({
                        title: "Course ".concat(i + 1),
                        description: "Description of Course ".concat(i + 1),
                        date: new Date(),
                        iconId: images[i].id,
                    }); });
                    return [4 /*yield*/, Promise.all(coursesData.map(function (course) { return prisma.course.create({ data: course }); }))];
                case 3:
                    _a.sent();
                    erasmusImageIds = [images[20].id, images[10].id, images[11].id, images[12].id, images[13].id, images[14].id,
                        images[15].id, images[16].id, images[17].id, images[18].id, images[19].id,
                        images[2].id, images[3].id, images[4].id, images[5].id, images[6].id,
                        images[7].id, images[8].id, images[9].id, images[1].id];
                    erasmusTitles = 'ABCDEFGHIJKLMNOPQRST'.split('');
                    erasmusCoursesData = erasmusTitles.map(function (letter, i) { return ({
                        title: "Erasmus ".concat(letter),
                        description: "Short desc ".concat(letter),
                        content: "Content ".concat(letter),
                        date: new Date(),
                        imageId: erasmusImageIds[i],
                    }); });
                    return [4 /*yield*/, Promise.all(erasmusCoursesData.map(function (course) { return prisma.erasmusCourse.create({ data: course }); }))];
                case 4:
                    _a.sent();
                    erasmusProjectData = Array.from({ length: 20 }, function (_, i) { return ({
                        title: "Project ".concat(String.fromCharCode(65 + i)), // A, B, C ...
                        url: "https://project.com/".concat(String.fromCharCode(97 + i)), // a, b, c ...
                        date: new Date(),
                        imageId: images[i].id,
                    }); });
                    return [4 /*yield*/, Promise.all(erasmusProjectData.map(function (project) { return prisma.erasmusProject.create({ data: project }); }))];
                case 5:
                    _a.sent();
                    postsData = Array.from({ length: 20 }, function (_, i) {
                        var categories = ['News', 'Event', 'Blog'];
                        return {
                            title: "Post ".concat(i + 1),
                            category: categories[i % 3],
                            content: "Content of post ".concat(i + 1),
                            date: new Date(),
                        };
                    });
                    return [4 /*yield*/, Promise.all(postsData.map(function (post) { return prisma.post.create({ data: post }); }))];
                case 6:
                    posts = _a.sent();
                    // 7. Lier les images aux posts (1 image par post)
                    return [4 /*yield*/, Promise.all(posts.map(function (post, i) { return prisma.image.update({
                            where: { id: images[i].id },
                            data: { postId: post.id }
                        }); }))];
                case 7:
                    // 7. Lier les images aux posts (1 image par post)
                    _a.sent();
                    videosData = Array.from({ length: 20 }, function (_, i) { return ({
                        title: "Video ".concat(i + 1),
                        url: "https://cdn.example.com/videos/v".concat(i + 1, ".mp4"),
                        date: new Date(),
                    }); });
                    return [4 /*yield*/, Promise.all(videosData.map(function (video) { return prisma.video.create({ data: video }); }))];
                case 8:
                    _a.sent();
                    console.log('Seed data inserted successfully');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
