import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import "./index.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

const IndexPage = ({data}) => {
  const [username, setUsername] = useState("");
  const [dialogVisible, setDialogVisible] = useState(username === null || username.trim() === "");
  useEffect(() => {
    const localstorage = global.localStorage;
    setUsername(localstorage.getItem("username") || "")
    setDialogVisible(username === null || username.trim() === "")
  }, [])
  const handleDialogSave = (e) => {
    const localstorage = global.localStorage;
    e.preventDefault();
    if (username !== null && username.trim() !== "") {
      setDialogVisible(false)
      localstorage.setItem("username", username)
    }    
  }
  const { title, description, author } = data.site.siteMetadata
  
  return (
    <div className="outerContainer">
      <h1>{title }</h1>
      <h2>{description }</h2>
      <h3>{author}</h3>
      <br />

      <Img fixed={data.divider.childImageSharp.fixed} />
      <Img fixed={data.splash.childImageSharp.fixed} />
      <Img fixed={data.divider.childImageSharp.fixed} />
      <div className="documentListLabel" >
        Select a document to collaborate on below
         {data.allMarkdownRemark.edges.map((item, index) => {
           return (
             <div key={index} className="documentDiv">
               <a href={item.node.frontmatter.slug}
                 onMouseOver={(e) => {
                   e.target.parentNode.style.backgroundColor = "#ff0000";
                   }
                 }
                 onFocus={(e) => { }} onBlur={(e) => { }}
                 onMouseOut={(e) => {
                   e.target.parentNode.style.backgroundColor = "#eaeaea"
                 }
                 }
               >
                {item.node.frontmatter.title}
               </a>
                 

             </div>
           )
         })}
      </div>
      <Dialog
        open={dialogVisible}
        maxWidth="sm"
        fullWidth={true}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}>
          <DialogTitle>
          You need a username to use JAMboard
          </DialogTitle>
          <DialogContent>
          <TextField
            label="enter username here"
            fullWidth
            variant="outlined"
            required={true}
            defaultValue=""
            onChange={(e) => setUsername(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogSave}
            colot="primary" variant="outlined"
          >
            Save
          </Button>
            
        </DialogActions>
        </Dialog>
    </div>
  )
}

export default IndexPage


export const pageQuery = graphql`
  query {
    splash: file(relativePath: { eq: "splash.png" }) {
      childImageSharp {
        fixed(width: 420, height: 296) { ...GatsbyImageSharpFixed }
      }
    }
    divider: file(relativePath: { eq: "divider.png" }) {
      childImageSharp {
        fixed(width: 600, height: 25) { ...GatsbyImageSharpFixed }
      }
    }
    site {
      siteMetadata {
        title
        description
        author
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          frontmatter {
            title
            slug
          }
        }
      }
    }
  }
`