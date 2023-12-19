import { PostType } from "../types";
import Link from "next/link";
import { insertBreaks } from "./common/insertBreaks";
import TriColon from "./common/TriColon";

type Props = {
  post: PostType;
  setLatestPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
};

const Post = (props: Props) => {
  const { post } = props;
  const { setLatestPosts } = props;

  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <div className="mb-4">
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <Link href={`/profile/${post.authorId}`}>
              <img
                className="w-10 h-10 rounded-full mr-2"
                src={post.author.profile?.profileImageUrl}
                alt="User Avatar"
              />
            </Link>

            <div>
              <Link href={`/profile/${post.authorId}`}>
                <h2 className="font-semibold text-md">
                  {post.author?.username}
                </h2>
              </Link>
              <p className="text-gray-500 text-sm">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          <TriColon post={post} setLatestPosts={setLatestPosts} />
        </div>
        <p className="text-gray-700">{insertBreaks(post.content)}</p>
      </div>
    </div>
  );
};

export default Post;
