import { Component, OnInit } from '@angular/core';
import { IAuthor, IPost } from '../shared/interfaces/blog.interface';
import { BlogserviseService } from '../shared/servises/blogservise.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  public headerBtn = true;
  public userName!: string;
  public postArray: Array<IPost> = [];
  public authorArray: Array<IAuthor> = [];
  public showSingUp = false;
  public showAddPost = false;
  public showSingIn = false;
  public idPost!: number;
  public btnPost = true;
  public border = true;
  public addEdit = true;
  public email!: string;
  public pass!: string;

  public showAdminBtns = false;

  public post = {
    title: '',
    text: '',
  };
  public author = {
    name: '',
    email: '',
    pass: '',
  };
  public regExp = {
    name: /^\w{4,16}$/i,
    pass: /^[a-z|0-9|\.|_|-]{4,16}$/i,
    email: /\w+@[a-zA-Z_]+?\.[a-zA-Z]{1,5}/,
  };

  constructor(private BlogserviseService: BlogserviseService) {}

  ngOnInit(): void {
    this.getPost();
    this.getAuthor();
  }
  getPost(): void {
    this.postArray = this.BlogserviseService.getPost();
  }
  getAuthor(): void {
    this.authorArray = this.BlogserviseService.getAuthor();
  }
  singIn(): void {
    this.showSingIn = true;
  }
  submitIn(): void {
    for (let user of this.authorArray) {
      if (user.email === this.email && user.pass === this.pass) {
        this.userName = user.name;
        this.headerBtn = false;
        this.modalHide();
        if (this.userName === 'admin') {
          this.showAdminBtns = true;
        }
      } else {
        this.border = false;
        this.email = '';
        this.pass = '';
        alert('Wrong data');
      }
    }
  }
  singUp(): void {
    this.showSingUp = true;
  }
  submitUp(): void {
    let unique = this.authorArray.some(
      (user) =>
        user.email === this.author.email || user.name === this.author.name);
    if (
      this.regExp.name.test(this.author.name) &&
      this.regExp.email.test(this.author.email) &&
      this.regExp.pass.test(this.author.pass) &&
      !unique
    ) {
      const newUser = {
        id: 1,
        name: this.author.name,
        email: this.author.email,
        pass: this.author.pass,
      };
      if (this.authorArray.length > 0) {
        const iDUser = this.postArray.slice(-1)[0].id;
        newUser.id = iDUser + 1;
      }
      this.BlogserviseService.addUsers(newUser);
      this.userName = this.author.name;
      this.modalHide();
      this.headerBtn = false;
    } else {
      this.border = false;
      return;
    }
    this.headerBtn = false;
  }
  addPost(): void {
    this.showAddPost = true;
  }
  addEditPost(): void {
    if (!this.post.title || !this.post.text) {
      this.border = false;
    } else {
      const newPost = {
        id: 1,
        name: this.post.title,
        author: this.userName,
        content: this.post.text,
        time: new Date(),
      };
      if (this.postArray.length > 0) {
        const iDPost = this.postArray.slice(-1)[0].id;
        newPost.id = iDPost + 1;
      }
      this.BlogserviseService.addPost(newPost);
      this.modalHide();
    }
  }
  editPost(posT: IPost): void {
    this.post.title = posT.name;
    this.post.text = posT.content;
    this.idPost = posT.id;
    this.showAddPost = true;
    this.addEdit = false;
  }
  uppdatePost(): void {
    const uppPost = {
      id: this.idPost,
      name: this.post.title,
      author: this.userName,
      content: this.post.text,
      time: new Date(),
    };
    this.BlogserviseService.updatePost(uppPost, this.idPost);
    this.modalHide();
  }
  deletePost(posT: IPost): void {
    this.BlogserviseService.deletePost(posT.id);
  }
  singOut(): void {
    this.headerBtn = true;
    this.showAdminBtns = false;
  }
  close(): void {
    this.modalHide();
  }
  modalHide(): void {
    this.showAddPost = false;
    this.showSingIn = false;
    this.showSingUp = false;
    this.addEdit = true;
    this.post.text = '';
    this.post.title = '';
    this.border = true;
    this.author.name = '';
    this.author.email = '';
    this.author.pass = '';
    this.pass = '';
    this.email = '';
  }
}
