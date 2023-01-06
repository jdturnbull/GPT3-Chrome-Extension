from haystack.document_stores import InMemoryDocumentStore
from haystack.nodes import FARMReader

document_store = InMemoryDocumentStore()
model = "deepset/roberta-base-squad2"
reader = FARMReader(model, use_gpu=True)


def run(data):
    # Alright, what do i want to do?
    # I want to take the question and context out of the data
    # I want to create a document from the context
    # I then want to use the document and query to create an answer
    # If there is an answer then I want to use the answer to create a response
    # Or do i instead want to use the context that was returned to make GPT-3 generate a response?

    # Get the question and context
    question = data.question
    context = data.context

    # Create a document from the context
