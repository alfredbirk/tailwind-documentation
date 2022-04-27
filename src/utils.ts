// @ts-nocheck

const getNextLvl = (lvl: string) => {
    switch (lvl) {
        case "lvl3":
            return "lvl4";
        case "lvl2":
            return "lvl3";
        case "lvl1":
            return "lvl2";
        case "lvl0":
            return "lvl1";
        case "lvl4":
            return undefined;
        default:
            break;
    }
};

export type Node = {
    name: string;
    children: Node[];
    lvl: string;
    url: string;
    highlightResult: string;
}


export const getLvl0Nodes = (graph: any) => {
    let lvl0Nodes: any = [];
    for (const node of Object.values(graph)) {
        if (node.lvl === "lvl0") {
            lvl0Nodes.push(node)
        }
    }
    return lvl0Nodes
}



export const createHierarchyGraph = (hits: any) => {
    let graph: any = {};

    for (const hit of hits) {
        let currentNode: Node;
    
        if (hit.hierarchy["lvl0"] in graph) {
            currentNode = graph[hit.hierarchy["lvl0"]];
            if (currentNode.children.length >=5) {
                continue
            } 
        } else {
            let newNode = {
                name: hit.hierarchy["lvl0"],
                children: [],
                lvl: "lvl0",
                url: hit.url,
                highlightResult: hit._highlightResult.hierarchy.lvl0.value,
            };
    
            graph[newNode.name] = newNode;
            currentNode = newNode;
        }
    
        let previousLvl = "lvl0";
    
        for (let index = 0; index < 1000; index++) {
            {
                const currentLvl: any = getNextLvl(previousLvl);
                if (!currentLvl || !hit.hierarchy[currentLvl]) break;
    
                const childrenNames = currentNode.children.map((child: any) => child.name);
    
                if (childrenNames.includes(hit.hierarchy[currentLvl])) {
                    currentNode = graph[hit.hierarchy[currentLvl]];
                } else {
                    let newNode = {
                        name: hit.hierarchy[currentLvl],
                        children: [],
                        lvl: currentLvl,
                        url: hit.url,
                        highlightResult: hit._highlightResult.hierarchy[currentLvl].value,
                    };
    
                    graph[newNode.name] = newNode;
                    currentNode.children.push(newNode);
                    currentNode = newNode;
                }
    
                previousLvl = currentLvl;
            }
        }
    }
    return graph
}

