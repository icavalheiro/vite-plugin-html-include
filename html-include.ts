import * as path from "path";
import * as fs from "fs";
import { parse } from "node-html-parser";
import { PluginOption } from "vite";

function processIncludes ( content: string, rootPath: string ): string
{
    const contentDom = parse( content );
    const includeTags = contentDom.querySelectorAll( "include" );

    for ( let i = 0; i < includeTags.length; i++ )
    {
        const include = includeTags[ i ];
        const srcPath = include.getAttribute( "src" );
        if ( !srcPath || srcPath.length < 1 )
        {
            throw new Error( "<include> must contain a 'src' attribute" );
        }

        const srcAbsolutePath = path.join( rootPath, srcPath );
        const srcContent = fs.readFileSync( srcAbsolutePath, "utf-8" );
        const srcContentParsed = processIncludes( srcContent, path.dirname( srcAbsolutePath ) );
        const srcContentDom = parse( srcContentParsed );
        include.before( srcContentDom );
        include.parentNode.removeChild( include );
    }

    return contentDom.toString();
}

export function htmlInclude (): PluginOption
{
    return {
        name: "html-include-plugin",
        transformIndexHtml ( html, ctx ): string
        {
            const processed = processIncludes( html, path.dirname( ctx.filename ) );
            return processed;
        },
        handleHotUpdate ( { file, server } )
        {
            if ( file.endsWith( ".html" ) )
            {
                console.log( "reloading html file..." );

                server.ws.send( {
                    type: "full-reload",
                    path: "*",
                } );
            }
        },
    };
};
