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
var faker_1 = require("@faker-js/faker");
var uuid_1 = require("uuid");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var i, i, images, i, image, i, i, i, categories, posts, i, post, i, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 50)) return [3 /*break*/, 4];
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                id: (0, uuid_1.v4)(),
                                name: faker_1.faker.person.fullName(),
                                email: faker_1.faker.internet.email(),
                                password: faker_1.faker.internet.password(),
                            },
                        })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    i = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < 50)) return [3 /*break*/, 8];
                    return [4 /*yield*/, prisma.newsletter.create({
                            data: {
                                id: (0, uuid_1.v4)(),
                                email: faker_1.faker.internet.email(),
                                createdAt: faker_1.faker.date.recent(),
                            },
                        })];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 5];
                case 8:
                    images = [];
                    i = 0;
                    _a.label = 9;
                case 9:
                    if (!(i < 200)) return [3 /*break*/, 12];
                    return [4 /*yield*/, prisma.image.create({
                            data: {
                                id: (0, uuid_1.v4)(),
                                url: "https://picsum.photos/seed/".concat(i, "/200"),
                            },
                        })];
                case 10:
                    image = _a.sent();
                    images.push(image);
                    _a.label = 11;
                case 11:
                    i++;
                    return [3 /*break*/, 9];
                case 12:
                    i = 0;
                    _a.label = 13;
                case 13:
                    if (!(i < 50)) return [3 /*break*/, 16];
                    return [4 /*yield*/, prisma.course.create({
                            data: {
                                id: (0, uuid_1.v4)(),
                                title: faker_1.faker.company.catchPhrase(),
                                description: faker_1.faker.lorem.sentence(),
                                active: faker_1.faker.datatype.boolean(),
                                date: faker_1.faker.date.recent(),
                                iconId: images[i].id,
                            },
                        })];
                case 14:
                    _a.sent();
                    _a.label = 15;
                case 15:
                    i++;
                    return [3 /*break*/, 13];
                case 16:
                    i = 0;
                    _a.label = 17;
                case 17:
                    if (!(i < 50)) return [3 /*break*/, 20];
                    return [4 /*yield*/, prisma.erasmusCourse.create({
                            data: {
                                id: (0, uuid_1.v4)(),
                                title: faker_1.faker.company.catchPhrase(),
                                description: faker_1.faker.lorem.sentence(),
                                content: faker_1.faker.lorem.paragraphs(2),
                                date: faker_1.faker.date.recent(),
                                imageId: images[50 + i].id,
                            },
                        })];
                case 18:
                    _a.sent();
                    _a.label = 19;
                case 19:
                    i++;
                    return [3 /*break*/, 17];
                case 20:
                    i = 0;
                    _a.label = 21;
                case 21:
                    if (!(i < 50)) return [3 /*break*/, 24];
                    return [4 /*yield*/, prisma.erasmusProject.create({
                            data: {
                                id: (0, uuid_1.v4)(),
                                title: faker_1.faker.company.name(),
                                url: faker_1.faker.internet.url(),
                                date: faker_1.faker.date.recent(),
                                imageId: images[100 + i].id,
                            },
                        })];
                case 22:
                    _a.sent();
                    _a.label = 23;
                case 23:
                    i++;
                    return [3 /*break*/, 21];
                case 24:
                    categories = [client_1.Category.Web, client_1.Category.Facebook];
                    posts = [];
                    i = 0;
                    _a.label = 25;
                case 25:
                    if (!(i < 50)) return [3 /*break*/, 28];
                    return [4 /*yield*/, prisma.post.create({
                            data: {
                                id: (0, uuid_1.v4)(),
                                title: faker_1.faker.lorem.words(3),
                                category: categories[i % 2],
                                content: faker_1.faker.lorem.paragraphs(1),
                                date: faker_1.faker.date.recent(),
                            },
                        })];
                case 26:
                    post = _a.sent();
                    posts.push(post);
                    _a.label = 27;
                case 27:
                    i++;
                    return [3 /*break*/, 25];
                case 28:
                    i = 0;
                    _a.label = 29;
                case 29:
                    if (!(i < 50)) return [3 /*break*/, 33];
                    return [4 /*yield*/, prisma.image.update({
                            where: { id: images[150 + i * 2].id },
                            data: { postId: posts[i].id },
                        })];
                case 30:
                    _a.sent();
                    return [4 /*yield*/, prisma.image.update({
                            where: { id: images[151 + i * 2].id },
                            data: { postId: posts[i].id },
                        })];
                case 31:
                    _a.sent();
                    _a.label = 32;
                case 32:
                    i++;
                    return [3 /*break*/, 29];
                case 33:
                    i = 0;
                    _a.label = 34;
                case 34:
                    if (!(i < 50)) return [3 /*break*/, 37];
                    return [4 /*yield*/, prisma.video.create({
                            data: {
                                id: (0, uuid_1.v4)(),
                                title: faker_1.faker.lorem.words(4),
                                url: faker_1.faker.internet.url(),
                                date: faker_1.faker.date.recent(),
                            },
                        })];
                case 35:
                    _a.sent();
                    _a.label = 36;
                case 36:
                    i++;
                    return [3 /*break*/, 34];
                case 37: return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () {
    console.log('Seed completed');
})
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
