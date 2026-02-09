export interface ICommentOnArticlesUser {
text: string;
id: number;
userId: number;
createdAt: string;
updatedAt: string;
}

export interface IUserArticle {
title: string;
description: string;
id: number;
comments: ICommentOnArticlesUser[];
createdAt: string;
updatedAt: string;
}

export interface IUserProfile {
id: number;
username: string;
name:string;
email: string;
articles: IUserArticle[];
createdAt: string;
updatedAt: string;
}