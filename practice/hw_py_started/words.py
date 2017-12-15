from urllib.request import urlopen


def fetch_words(url):
    """Fetch a list of words from url.
    Args:
        url: url of a UTF-8 text format.

    Returns:
        A list of string containing the words from document.
    """
    with urlopen(url) as story:
        story_words = []
        for line in story:
            line_words = line.decode('utf-8').split()
            for word in line_words:
                story_words.append(word)
                return story_words


def print_items(items):
    for item in items:
        print(item)


def main(url):
    words = fetch_words(url)
    print_items(words)


if __name__ == '__main__':
    main('http://sixty-north.com/c/t.txt')