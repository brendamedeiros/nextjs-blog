import { Fragment } from "react";
import Head from "next/head";

import { getPostData, getPostsFiles } from "../../helpers/posts-util";
import PostContent from "../../components/posts/post-detail/PostContent";

function SinglePostPage(props) {
    const { post } = props;
    return (
        <Fragment>
            <Head>
                <title>{post.title}</title>
                <meta name="description" content={post.excerpt} />
            </Head>
            <PostContent post={props.post} />
        </Fragment>
    );
}

export async function getStaticProps(context) {
    const { params } = context;
    const { slug } = params;

    const postData = getPostData(slug);

    return {
        props: {
            post: postData,
        },
        revalidate: 600,
    };
}

export async function getStaticPaths() {
    const postFilenames = getPostsFiles();

    const slugs = postFilenames.map((fileName) =>
        fileName.replace(/\.md$/, "")
    );

    return {
        paths: slugs.map((slug) => ({ params: { slug: slug } })),
        fallback: false,
    };
}

export default SinglePostPage;
