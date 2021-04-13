import { Fragment } from "react";
import Head from "next/head";

import AllPosts from "../../components/posts/AllPosts";
import { getAllPosts } from "../../helpers/posts-util";

function AllPostsPage(props) {
    return (
        <Fragment>
            <Head>
                <title> All Posts </title>
                <meta
                    name="description"
                    content="A list ofs programming-related tutorials and posts!"
                />
            </Head>
            <AllPosts posts={props.posts} />
        </Fragment>
    );
}

export async function getStaticProps() {
    const allPosts = getAllPosts();

    return {
        props: {
            posts: allPosts,
        },
        revalidate: 60,
    };
}

export default AllPostsPage;
