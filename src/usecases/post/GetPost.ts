import BadRequestError from "../../interface/http/errors/BadRequest";
import NotFoundError from "../../interface/http/errors/NotFound";
import { Table, IPostUsecase } from "../../infra/support/interfaces";

class GetPost {
  constructor(private options: IPostUsecase) {}

  async execute(postId: string): Promise<Table> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!postId) throw new BadRequestError("post id cannot be empty");

        const post: Table = await this.options.postRepository.getPostById(postId);
        if (!post) throw new NotFoundError("post not found");

        resolve(post);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default GetPost;
