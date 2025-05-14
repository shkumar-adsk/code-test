# Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

# An input string is valid if:

# Open brackets must be closed by the same type of brackets.
# Open brackets must be closed in the correct order.
# Every close bracket has a corresponding open bracket of the same type.

# Example 1:

# Input: s = "()"
# Output: true
# Example 2:

# Input: s = "()[]{}"
# Output: true
# Example 3:

# Input: s = "(]"
# Output: false

# Constraints:

# 1 <= s.length <= 104
# s consists of parentheses only '()[]{}'.


# ({{[]}})

def check_string(s):
    brk_dict = {
        "}": "{",
        ")": "(",
        "]": "["
    }

    stack = []
    for brkt in s:
        if len(stack) == 0:
            if brkt in brk_dict.keys():
                return False
            else:
                stack.insert(0, brkt)
        else:
            if brkt in brk_dict.keys():
                in_stk_val = stack.pop(0)
                if in_stk_val == brk_dict[brkt]:
                    continue
                else:
                    return False
            else:
                stack.insert(0, brkt)

    if len(stack) == 0:
        return True
    return False


# TODO: please install pytest before running the tests.
# Use command pytest python-test-2.py
def test_success():
    input_str = "({})"
    result = check_string(input_str)
    assert result == True


def test_Faiure():
    input_str = "(})"
    result = check_string(input_str)
    assert result == False


if __name__ == "__main__":
    print(check_string('({{[]}})'))
    print(check_string('()[]{}'))
    print(check_string('(]'))
    print(check_string('()'))

if __name__ == "__main__":
    print(check_string('({{[]}})'))
    print(check_string('()[]{}'))
    print(check_string('(]'))
    print(check_string('()'))
