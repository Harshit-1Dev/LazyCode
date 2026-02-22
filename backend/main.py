from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Any, Dict, Optional
from collections import deque

# Step 1 — create app first
app = FastAPI()

# Step 2 — add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000",
        "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: Optional[str] = ""
    position: Optional[Dict[str, Any]] = {}
    data: Optional[Dict[str, Any]] = {}

    class Config:
        extra = 'allow'  # accept any extra fields React Flow sends


class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: Optional[str] = ""
    targetHandle: Optional[str] = ""

    class Config:
        extra = 'allow'  # accept any extra fields


class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]



def check_is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    node_ids = {n.id for n in nodes}

    graph: Dict[str, List[str]] = {n.id: [] for n in nodes}
    in_degree: Dict[str, int] = {n.id: 0 for n in nodes}

    for edge in edges:
        src, tgt = edge.source, edge.target
        if src in graph and tgt in node_ids:
            graph[src].append(tgt)
            in_degree[tgt] += 1

    queue = deque(nid for nid, deg in in_degree.items() if deg == 0)
    visited = 0

    while queue:
        nid = queue.popleft()
        visited += 1
        for neighbour in graph[nid]:
            in_degree[neighbour] -= 1
            if in_degree[neighbour] == 0:
                queue.append(neighbour)

    return visited == len(nodes)

@app.post('/')
def read_root():
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_dag    = check_is_dag(pipeline.nodes, pipeline.edges)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag':    is_dag,
    }