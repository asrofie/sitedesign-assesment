import fs from "fs"
import path from "path"

const filePath = path.resolve("dist/swagger-ui-dist/swagger-initializer.js")

let content = fs.readFileSync(filePath, "utf8")

const patched = content.replace(
    /url: .*,/,
    `url: "/api/v1/swagger.json",`
)

fs.writeFileSync(filePath, patched)

console.log("Patched swagger-initializer.js with custom URL")
