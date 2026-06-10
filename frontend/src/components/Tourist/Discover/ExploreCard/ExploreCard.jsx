import styles from "./ExploreCard.module.css";


function ExploreCard({ blog }) {
console.log(blog);
    return (

        <div className={styles.card}>
            <div className={styles.image}>
                <span>Image</span>
            </div>

            <div className={styles.content}>
                <h3 className={blog.title}>Blog Title</h3>
                <h3 className={blog.time}>Blog Title</h3>

                {/* <p className={blog.readTime}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sapien eget nunc efficitur commodo.</p> */}
            </div>
        </div>
    
    )
}


export default ExploreCard;