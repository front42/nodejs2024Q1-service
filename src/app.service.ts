import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `<h2>Continue your request with /user, /track, /artist, etc...</h2>
    <a href="https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/rest-service/assignment.md">
      <h1>Full list of routes</h1>
    </a>`;
  }
}
